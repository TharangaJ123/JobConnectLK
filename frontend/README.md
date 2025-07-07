# 🌟 **MERN Portfolio Web Application**  

A **modern, responsive, and dynamic** portfolio website built with the **MERN stack** (MongoDB, Express.js, React, Node.js) to showcase your projects, skills, and professional journey.  

✨ **Features:**  
✔ **Fully Responsive** – Works on desktop, tablet, and mobile  
✔ **Dynamic Content** – Admin panel to update projects, skills, and bio  
✔ **Modern UI** – Sleek animations & clean design  
✔ **Dark/Light Mode** – Toggle between themes  
✔ **Contact Form** – Email integration for inquiries  
✔ **SEO Optimized** – Better visibility on search engines  

---

## 🚀 **Live Demo**  
👉 **[https://yourportfolio.com](https://yourportfolio.com](https://my-portfolio-website-eosin-theta.vercel.app/)** *(Replace with your deployed link)*  

---

## 🛠 **Tech Stack**  

### **Frontend**  
- **React.js** – UI components & interactivity  
- **Tailwind CSS** – Styling & responsive design  
- **Framer Motion** – Smooth animations  
- **React Router** – Navigation & routing  
- **Axios** – API requests  

### **Backend**  
- **Node.js & Express.js** – Server & API  
- **MongoDB (Atlas)** – Database for portfolio content  
- **Mongoose** – Database modeling  
- **JWT** – Secure authentication for admin panel  
- **Nodemailer** – Contact form email handling  

### **Deployment**  
- **Frontend:** Vercel / Netlify  
- **Backend:** Render / Heroku  
- **Database:** MongoDB Atlas  

---

## ⚡ **Quick Start**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/yourusername/mern-portfolio.git
cd mern-portfolio
```

### **2. Set Up Backend**  
```bash
cd backend
npm install
```

- Create a `.env` file in `/backend` with:  
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### **3. Set Up Frontend**  
```bash
cd ../frontend
npm install
```

- Create a `.env` file in `/frontend` with:  
```env
REACT_APP_API_URL=http://localhost:5000  # Replace with backend URL
```

### **4. Run the Application**  
- **Start Backend:**  
```bash
cd ../backend
npm start
```
- **Start Frontend (in a new terminal):**  
```bash
cd ../frontend
npm start
```

- Open **[http://localhost:3000](http://localhost:3000)** in your browser!  

---

## 📂 **Project Structure**  

```
mern-portfolio/
├── backend/               # Node.js + Express server
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── controllers/       # Business logic
│   └── middleware/        # Auth & validation
│
├── frontend/              # React.js app
│   ├── src/
│   │   ├── components/    # Reusable UI
│   │   ├── pages/         # Main views
│   │   ├── context/       # State management
│   │   └── assets/        # Images & styles
│
└── README.md              # This file
```

---

## 🔧 **Customization**  

1. **Update Content**  
   - Modify `/frontend/src/data/` for static content  
   - Use the **Admin Panel** (`/admin`) for dynamic updates  

2. **Change Theme Colors**  
   - Edit `tailwind.config.js` in `/frontend`  

3. **Deploy**  
   - **Frontend:** Connect GitHub repo to Vercel/Netlify  
   - **Backend:** Deploy to Render/Heroku with MongoDB Atlas  

---

## 📜 **License**  
MIT License – Free for personal and commercial use.  

---

## 🤝 **Contributing**  
Feel free to fork, improve, and submit PRs!  

**Showcase your work in style!** 🎨💻  

--- 

Need help? Open an issue or reach out! 🚀
