 
 
# Gmail Classifier using Google OAuth and GPT-4o

A full-stack web application that allows users to log in with Google OAuth, fetch their latest emails from Gmail, and classify them into categories (Important, Promotions, Social, Marketing, Spam, General) using **OpenAI GPT-4o**.

---

## 🚀 Features

- 🔑 Login securely using **Google OAuth**
- 📩 Fetch latest **15 emails** from Gmail
- 🧠 Classify emails using **GPT-4o**
- 💾 Save user’s OpenAI key in local storage
- 🖥️ Simple & clean **React frontend** with Tailwind
- 🧩 Backend built using **Express.js** and **LangChain.js**

---

## 🧰 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- React Router

**Backend:**
- Express.js
- LangChain.js
- Google APIs (OAuth, Gmail API)
- OpenAI GPT-4o

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo
git clone https://github.com/ManaSSKulkarni/gmail-classifier.git
cd gmail-classifier

### 2️⃣ Install dependencies
cd client
npm install
cd ../server
npm install

### 3️⃣ Configure environment variables

Create a .env file in /server with the following:

GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
OPENAI_API_KEY=your_openai_api_key_here
SESSION_SECRET=your_random_secret_key

### 4️⃣ Start the backend server
cd server
npm start

### 5️⃣ Start the frontend
cd ../client
npm start

### 💡 How It Works

Login: User logs in with Google OAuth → token generated

Fetch Emails: App fetches latest X emails (default 15) from Gmail

Classify: GPT-4o model categorizes each email into predefined labels

Display: Emails shown with category filters and expandable view

### 🧠 Categories

## Category	Description
Important	
Personal/work emails requiring attention
Promotions	Marketing/sales-related content
Social network, friends, or family messages
Marketing	Newsletters or marketing updates
Spam	Unsolicited or irrelevant emails
General	
Default for uncategorized

### Common Issues

 Access Blocked : Ony Test Users are allowed
 No emails showing : Log In Issue
 Failed to classify : Open AI Key issue.
 Mail Unclassified : GPT-4o Expired or needs renewal.

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


### 🪶 License

This project is licensed under the MIT License

### 🧠 Notes

  The app is currently in Testing mode.
  Any Gmail account that should log in should be added under Test Users by Developer

  No database is required — emails are fetched directly from Gmail API.

  The OpenAI key is stored locally for user privacy.

### ❤️ Developer’s Note

 “Everything has a timing — like a mango tree. Despite all efforts, Fruits come only when the season is right.” 🌱

 This project reflects my learning and work with full-stack OAuth integrations, API handling, and AI-powered classification using GPT-4o.

### Developed by: Manas S Kulkarni
📧 [manaskulkarniwork@gmail.com]
💼 GitHub: https://github.com/ManaSSKulkarni


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
