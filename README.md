# SkillSwap 🔁  
*A Peer-to-Peer Skill Exchange Platform using Time Credits*

SkillSwap is a **full-stack MERN application** that allows users to exchange skills with each other using **time credits instead of money**. Users teach what they know, earn time credits, and spend those credits to learn new skills from others — promoting collaborative and fair learning.

---

## 🎥 Working Demo / Tutorial
👉 **Complete working walkthrough:**  
https://youtu.be/WthbLqcGbcM

---

## 🚀 Features

### 👤 Authentication & User Profiles
- Secure user registration and login using **JWT authentication**
- Persistent authentication using `/api/auth/me`
- User profiles displaying skills, exchanges, and time credits

---

### 🧠 Skill Marketplace
- Create and delete skill posts
- Browse and explore skills offered by other users
- Each skill is valued using **time credits**, not currency

---

### 🔄 Skill Exchange System
- Send skill exchange requests to other users
- Accept or reject incoming requests
- Track exchange status and history
- Exchange logic ensures **fair credit-based transactions**

---

### 💬 Real-Time Chat (Socket.IO)
- Real-time one-to-one messaging between exchange participants
- Implemented using **Socket.IO** for low-latency bi-directional communication
- Chat rooms scoped to individual exchange requests
- Enables smooth coordination before and during skill exchanges

---

### 💬 Community Interaction
- Comment system on skill posts
- Encourages discussion, clarification, and engagement

---

### 🔐 Protected Routes
- Route-level access control for authenticated users
- Prevents unauthorized access to private pages

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- Plain **CSS** (no UI frameworks)
- Axios for API communication
- React Router for navigation
- Socket.IO Client for real-time chat

### Backend
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Socket.IO**
- JWT-based Authentication


---

## ⚙️ Core APIs

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- Skill CRUD APIs
- Exchange Request APIs
- Comment APIs
- Socket.IO events for real-time chat

---

## 🧠 Engineering Highlights

- Designed a **time-credit based system** to eliminate monetary dependency
- Implemented **real-time communication** using Socket.IO with room-based messaging
- Clean separation of concerns using MVC architecture
- RESTful API design with proper validation and error handling
- Scalable backend structure for future growth

---

## 📈 Future Enhancements
- Skill ratings & reviews
- Notifications for exchange updates
- Admin dashboard
- Deployment using Docker & CI/CD
- Search & recommendation system

---

## 🧑‍💻 Author
**Sneha**  
2nd Year Computer Science Student  
Focused on Full-Stack Development & Problem Solving  

---

## ⭐ Support
If you like this project, consider giving it a ⭐  
Contributions and feedback are welcome!
