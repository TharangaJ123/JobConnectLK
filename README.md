
# JobConnectLK 📱 – Empowering Sri Lankan Youth with AI-Powered Career Support

**JobConnectLK** is a mobile-first platform developed using **React (Web)** and **Flask (Python)** to tackle unemployment and underemployment in **Sri Lanka**, with a special focus on **rural and underserved communities**.

It connects **job seekers** with **employers**, **training providers**, and an **AI career assistant** that offers multilingual support.

---

## 🌟 Key Features

- 🔍 **Job Marketplace** – Search and apply for local/foreign jobs  
- 📄 **Smart Resume Builder** – Step-by-step CV creation tool  
- 🎯 **Skill Gap Analyzer** – Identify missing skills and get personalized suggestions  
- 🤖 **AI Career Guidance Chatbot** – Available in Sinhala, Tamil, and English  
- 🎓 **Training Programs** – Free & paid courses from verified providers  
- 🧑‍💼 **Employer Dashboard** – Post jobs, view applicants, manage hiring  
- 📱 **Mobile-First & Offline-Friendly** – Lightweight design for low-data users  

---

## 🏗️ Tech Stack

| Layer           | Technology                              |
|----------------|------------------------------------------|
| Frontend       | React (Vite) / Tailwind CSS              |
| State Mgmt     | Redux Toolkit / Context API / Zustand    |
| Backend        | Python Flask                             |
| AI Chatbot     | OpenAI API / Gemini 1.5 Flash            |
| Resume Parsing | Python + `pdfplumber`, `pyresparser`     |
| Auth           | Firebase Auth / Custom JWT               |
| Database       | Firebase Firestore / MongoDB             |
| File Storage   | Firebase Storage / AWS S3                |

---

## 🖥️ Screens (React Frontend)

- 🔸 Home – Featured jobs & career tools  
- 🔸 Job Listings + Filters  
- 🔸 Resume Builder (step-by-step form)  
- 🔸 Skill Gap Analyzer  
- 🔸 AI Career Guidance (chatbot)  
- 🔸 Training Courses  
- 🔸 Profile & Account Settings  

---

## ⚙️ Installation

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/JobConnectLK.git
cd JobConnectLK
````

### 2. Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Setup (Flask + Python)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

> ⚠️ Make sure Flask and frontend URLs allow **CORS** (`flask_cors`) and API calls.

---

## 🧪 Testing

### Frontend

```bash
npm test
```

### Backend

Use Postman or curl to test endpoints like:

* `POST /upload-resume`
* `POST /analyze-skills`
* `POST /job-match`

---

## 📁 Folder Structure

```
JobConnectLK/
├── frontend/           # React app
│   ├── components/
│   ├── screens/
│   ├── App.jsx
│   └── ...
├── backend/            # Flask app
│   ├── app.py
│   ├── resume_parser.py
│   └── ...
└── README.md
```

---

## 🌐 Multilingual Support

> **Sinhala | Tamil | English** — Available in chatbot, UI labels, and prompts. You can manage localization using `i18n` or JSON-based custom language packs.

---

## 📬 Contact

**Tharanga Jayawardhana**
📍 Kongashandiya, Kegalle, Sri Lanka
📱 +94 76 684 0561
📧 [chathuratharanga076@gmail.com](mailto:chathuratharanga076@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/tharanga-jay/)
💻 [GitHub](https://github.com/TharangaJ123github)

---

## 🤝 Collaborate

We welcome:

* 👨‍💻 Developers (React, Python, AI, Firebase)
* 🏢 Employers & HR professionals
* 🎓 NGOs & training providers

### Contribute

```bash
# Fork and create a feature branch
git checkout -b feature/new-feature

# Commit and push
git commit -m "Add skill analyzer"
git push origin feature/new-feature

# Open Pull Request
```

---

## 📜 License

This project is licensed under the **MIT License** – feel free to reuse and contribute!

---

### 🇱🇰 JobConnectLK යනු ශ්‍රී ලංකාවේ තරුණයින්ට අනාගතයක් ගොඩනඟාදිය හැකි ජීවිකාමය හඳුනාදීමේ සහ වෘත්තීය මාර්ගෝපදේශන ක්‍රම වේදිකාවකි.

```

Let me know if you'd like:
- A Sinhala/Tamil-only version
- This README converted into a PDF
- An official GitHub logo/banner design for the project

✅ Ready to upload to GitHub!
```
