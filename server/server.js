// ===== IMPORTS =====
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const cors = require("cors");
const dotenv = require("dotenv");
const { google } = require("googleapis");
const { Buffer } = require("buffer");
const OpenAI = require("openai");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====

app.use(express.json({ limit: "10mb" }));     
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ===== GOOGLE OAUTH CONFIG =====
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      profile.accessToken = accessToken;
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// ===== ROUTES =====

// Google login flow
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/gmail.readonly",
    ],
  })
);

// OAuth callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/emails");
  }
);

// ===== FETCH FULL EMAILS =====
app.get("/api/emails", async (req, res) => {
  try {
    if (!req.user || !req.user.accessToken) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: req.user.accessToken });
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 15,
      q: "in:inbox",
    });

    const messages = response.data.messages || [];

    const emails = await Promise.all(
      messages.map(async (msg) => {
        const detail = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
          format: "full",
        });

        const headers = detail.data.payload.headers;
        const getHeader = (name) =>
          headers.find((h) => h.name === name)?.value || "";

        // Extract full plain text content
        const getBody = (payload) => {
          if (payload.parts) {
            for (const part of payload.parts) {
              if (part.mimeType === "text/plain" && part.body?.data) {
                return Buffer.from(part.body.data, "base64").toString("utf-8");
              } else if (part.parts) {
                const nested = getBody(part);
                if (nested) return nested;
              }
            }
          }
          if (payload.body?.data) {
            return Buffer.from(payload.body.data, "base64").toString("utf-8");
          }
          return "";
        };

        const content = getBody(detail.data.payload);

        return {
          id: msg.id,
          from: getHeader("From"),
          subject: getHeader("Subject"),
          snippet: content || detail.data.snippet || "(No content)",
        };
      })
    );

    res.json({ emails });
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
});

// ===== CLASSIFY EMAILS =====

app.post("/api/classify", async (req, res) => {
  try {
    const { emails, apiKey } = req.body;

    if (!emails || !Array.isArray(emails))
      return res.status(400).json({ error: "Invalid email data" });

    const OpenAI = require("openai");
    const openai = new OpenAI({ apiKey });

    const classified = [];

    const batchSize = 2;

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);

      const results = await Promise.allSettled(
        batch.map(async (email) => {
          const prompt = `
Classify this email into one of these categories:
Important, Promotional, Social, Marketing, Spam, or General.
Email details:
From: ${email.from}
Subject: ${email.subject}
Content: ${email.snippet}
Return only the category name.
          `;

          const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 20,
            temperature: 0.3,
          });

          const category = completion.choices[0].message.content.trim();
          return { ...email, category };
        })
      );

      results.forEach((r, idx) => {
        if (r.status === "fulfilled") {
          classified.push(r.value);
        } else {
          console.error(`Error classifying email ${batch[idx].id}:`, r.reason?.message || r.reason);
          classified.push({ ...batch[idx], category: "Unclassified" });
        }
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    res.json({ classified });
  } catch (error) {
    console.error("Error in classify route:", error.message);
    res.status(500).json({ error: "Failed to classify emails" });
  }
});


// ===== HEALTH CHECK =====
app.get("/api/health", (req, res) => res.json({ status: "OK" }));

// ===== START SERVER =====
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
