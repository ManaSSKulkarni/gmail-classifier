 
 
# Gmail Classifier using Google OAuth and OpenAI GPT-4o

A full-stack web application that allows users to **log in with Google**, fetch their **recent Gmail emails**, and classify them into categories such as **Important, Promotional, Social, Marketing, Spam, General, or Unclassified** using **OpenAI GPT-4o**.

---

## Features

-  **Google OAuth** login — secure Gmail authentication  
-  **Fetch last 15 Gmail emails** (using Gmail API)  
-  **AI classification** of emails with GPT-4o  
-  Dropdown filter by category  
-  Expand/Shrink view for individual emails  
-  API key securely stored in browser `localStorage` (no DB needed)

---

## Tech Stack

| Layer    | Technology                                 |
|------- --|--------------------------------------------|
| Frontend | React.js, Axios                            |
| Backend  | Node.js, Express.js, Passport.js           |
| APIs     | Google OAuth 2.0, Gmail API, OpenAI GPT-4o |
| Styling  | Inline CSS / Tailwind-ready                |


## Prerequisites

- Node.js v18+ and npm installed
- OpenAI API key
- Google Cloud project with OAuth credentials

## Setup & Run Instructions

### 1️. Clone the Repository

  git clone https://github.com/ManaSSKulkarni/gmail-classifier.git
  cd gmail-classifier

### 2. Install dependencies

  npm install

### 3. Configure environment variables

  Create a .env file in the root folder.

  Add the following placeholders:

   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   SESSION_SECRET=some_random_string
   OPENAI_API_KEY=your_openai_api_key_here


  Note: .env is ignored in Git, so sensitive keys are not pushed. See .env.example for reference.

### 4. Google OAuth Test Users

  Google OAuth app has intended testers (e.g., theindianappguy@gmail.com) added as Test Users.

  They can login with their Gmail accounts to test the app.

### 5. Set up the backend

  cd server
  npm install


### 6. .env file inside /server with:

  GOOGLE_CLIENT_ID=google_client_id
  GOOGLE_CLIENT_SECRET=google_client_secret
  PORT=5000


### 7. Run the backend:

  node server.js

  ✅ Server should start on http://localhost:5000


### 8.  Set Up the Frontend

  cd ../client
  npm install
  npm start

✅ React app will run on http://localhost:3000


### 9. Usage Guide

## 9.1 On the Login Page:

    1. Enter your OpenAI API key

    2. Click “Save API Key”

    3. Click “Login with Google”

    4. Log in using your Gmail (grant “read emails” permission).

    5. You’ll be redirected to the Email Viewer page.

    6. Click “Classify Emails” → GPT-4o will categorize them.

    7. Use dropdown filters or click any email to expand/shrink.

### 9.2 Common Issues

 Access Blocked : Ony Test Users are allowed
 No emails showing : Log In Issue
 Failed to classify : Open AI Key issue.

### 10 📁 Folder Structure

gmail-classifier/
│
├── client/                  # Frontend (React)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   └── EmailViewer.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                  # Backend (Express)
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md

### 🧠 Notes

  The app is currently in Testing mode.
  Any Gmail account that should log in should be added under Test Users by Developer

  No database is required — emails are fetched directly from Gmail API.

  The OpenAI key is stored locally for user privacy.

### ❤️ Developer’s Note

 “Maybe some things are meant to be incomplete — like a mango tree. Fruits come only when the time is right.” 🌱

 This project reflects my learning journey with full-stack OAuth integrations, API handling, and AI-powered classification using GPT-4o.

Developed by: Manas S Kulkarni
📧 [manaskulkarniwork@gmail.com]
💼 GitHub: https://github.com/ManaSSKulkarni


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
