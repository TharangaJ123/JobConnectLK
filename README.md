
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



# JobConnectLK 📱 – ශ්‍රී ලාංකික තරුණයින් සඳහා AI බලගැන්වූ රැකියා සහ උපදේශන වේදිකාවක්

**JobConnectLK** යනු React සහ Flask භාවිතයෙන් නිර්මාණය කරන ලද ජංගම පළමු ව්‍යාපෘතියක් වන අතර එය ශ්‍රී ලංකාවේ **රැකියා අහිමිවීම සහ අර්ධ වෘත්තීය තත්වයන්** විසඳීමට අරමුණු කරගෙන ඇත.

මෙම යෙදුම **ග්‍රාමීය හා පහත් ආදායම් ප්‍රදේශවල** තරුණයින්ට **රැකියා අවස්ථා**, **පුහුණු පාඨමාලා**, **කාර්ය මාර්ගෝපදේශන chatbot**, සහ **කුසලතා විශ්ලේෂණ** වැනි පහසුකම් සපයයි.

---

## 🌟 විශේෂාංග

- 🔍 **රැකියා වෙළඳපොල** – ශ්‍රී ලංකාවේ සහ විදේශ රැකියා සෙවීම හා අයදුම් කිරීම  
- 📄 **ජීවදත්ත (CV) සෑදීම** – පියවරෙන් පියවර ජීවදත්ත සෑදීම  
- 🎯 **කුසලතා හිඟ විශ්ලේෂණය** – අඩු කුසලතා හඳුනාගෙන පුහුණු මාර්ග යෝජනා  
- 🤖 **AI වෘත්තීය උපදේශන chatbot** – සිංහල, දෙමළ සහ ඉංග්‍රීසි භාෂාවන්ට සහය  
- 🎓 **පුහුණු පාඨමාලා** – නොමිලේ සහ ගෙවීම් සහිත පාඨමාලා සඳහා පිවිසුම  
- 🧑‍💼 **රැකියා දෙනවුන් සඳහා පුවරුවක්** – රැකියා දැන්වීම් පළ කිරීම හා අයදුම්කරු කළමනාකරණය  
- 📱 **Low-data/Offline මිතුරා** – අඩු දත්ත භාවිතය සහ offline සහය  

---

## 🏗️ තාක්ෂණය

| ස්ථරය           | තාක්ෂණය                              |
|------------------|----------------------------------------|
| ඉදිරිපස (Frontend) | React (Vite) / Tailwind CSS              |
| තත්ව කළමනාකරණය   | Redux Toolkit / Context API / Zustand   |
| පසුපස (Backend)   | Python Flask                            |
| AI Chatbot        | OpenAI API / Gemini 1.5 Flash           |
| ජීවදත්ත විශ්ලේෂණය | Python + `pdfplumber`, `pyresparser`    |
| Authentication    | Firebase Auth / JWT                     |
| දත්ත ගබඩාව       | Firebase Firestore / MongoDB            |
| ගොනු ගබඩාව       | Firebase Storage / AWS S3               |

---

## 🖥️ තිර සටහන් (Screens)

- 🔸 මුල් පිටුව – රැකියා සහ වෘත්තීය මෙවලම්  
- 🔸 රැකියා ලැයිස්තු + පෙරහන්  
- 🔸 ජීවදත්ත සෑදීම (Form)  
- 🔸 කුසලතා හිඟ විශ්ලේෂකය  
- 🔸 AI උපදේශන chatbot  
- 🔸 පුහුණු පාඨමාලා  
- 🔸 පරිශීලක පැතිකඩ  

---

## ⚙️ ස්ථාපනය

### 1. Repo එක clone කිරීම
```bash
git clone https://github.com/your-username/JobConnectLK.git
cd JobConnectLK
````

### 2. ඉදිරිපස (React) ස්ථාපනය

```bash
cd frontend
npm install
npm run dev
```

### 3. පසුපස (Flask) ක්‍රියාත්මක කිරීම

```bash
cd backend
pip install -r requirements.txt
python app.py
```

> ⚠️ Flask සහ React එකිනෙකා අතර **CORS** සහය සකසා තිබිය යුතුය (`flask_cors`).

---

## 🧪 පරීක්ෂාව

### ඉදිරිපස

```bash
npm test
```

### පසුපස

Postman හෝ curl භාවිතයෙන් API endpoint පරීක්ෂා කරන්න:

* `POST /upload-resume`
* `POST /analyze-skills`
* `POST /job-match`

---

## 📁 Folder සංරචනය

```
JobConnectLK/
├── frontend/           # React යෙදුම
│   ├── components/
│   ├── screens/
│   ├── App.jsx
│   └── ...
├── backend/            # Flask යෙදුම
│   ├── app.py
│   ├── resume_parser.py
│   └── ...
└── README_SI.md
```

---

## 🌐 බහුභාෂා සහය

> **සිංහල | දෙමළ | ඉංග්‍රීසි** — UI, chatbot සහ prompts සඳහා. `i18n` හෝ custom JSON-based language packs භාවිතයෙන් ක්‍රියාත්මක කළ හැක.

---

## 📬 සම්බන්ධ වන්න

**තරංග ජයවර්ධන**
📍 කොන්ගෂන්ඩිය, කැගල්ල, ශ්‍රී ලංකාව
📱 +94 76 684 0561
📧 [chathuratharanga076@gmail.com](mailto:chathuratharanga076@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/tharanga-jay/)
💻 [GitHub](https://github.com/TharangaJ123github)

---

## 🤝 එකතුව වන්න

ඇරයුම්:

* 👨‍💻 Developers (React, Python, AI, Firebase)
* 🏢 රැකියා සැපයුම්කරුවන්
* 🎓 NGOs සහ පුහුණු ආයතන

### Contribute කිරීමට

```bash
# Repo එක Fork කර feature එකක් නිර්මාණය කරන්න
git checkout -b feature/new-feature

# Commit කර Push කරන්න
git commit -m "Add skill analyzer"
git push origin feature/new-feature

# Pull Request එකක් open කරන්න
```

---



✅ You can save this as `README_SI.md` or upload it to GitHub along with your English `README.md`.

Would you like a **Tamil version** as well? Or I can auto-detect language based on user preference in the app if needed.
```

