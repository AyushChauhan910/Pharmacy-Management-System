# 💊 Pharmacy Management System

A modern, full-stack Pharmacy Management System built with **React**, **Node.js/Express**, and **MongoDB Atlas**. This app features a beautiful, animated Material-UI interface, dark mode, advanced analytics, role-based access, and more.

---

## 🚀 Features

- **Animated, Responsive UI**: Beautiful Material-UI design with smooth transitions, gradients, and dark mode toggle.
- **Role-Based Access**: Admin/user roles, user management, and secure JWT authentication.
- **Entity Management**: CRUD for Patients, Doctors, Pharmacies, Drugs, and more.
- **Advanced Tables**: Search, sort, pagination, and CSV export for all data tables.
- **Dashboard & Analytics**: Interactive charts (Chart.js) for top-selling drugs, entity distribution, and more.
- **Notifications**: Success/error toasts for all actions (notistack).
- **Reporting**: Generate reports (e.g., prescriptions in a date range, top-selling drugs).
- **Dark Mode**: Toggle between light and dark themes instantly.
- **Mobile Friendly**: Fully responsive for desktop, tablet, and mobile.

---

## 🛠️ Tech Stack

- **Frontend**: React, Material-UI (MUI), Chart.js, notistack
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas (cloud)
- **Authentication**: JWT (JSON Web Tokens)

---

## Live Link - 
https://pharmacy-management-system-ten.vercel.app/

---

## ⚡ Quick Start

### 1. **Clone the Repository**
```sh
# Clone the repo
https://github.com/your-username/pharmacy-management-system.git
cd pharmacy-management-system
```

### 2. **Backend Setup**
```sh
cd backend
npm install
# Create a .env file with your MongoDB Atlas URI and JWT secret
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

### 3. **Frontend Setup**
```sh
cd ../frontend
npm install
npm start
```

- The frontend runs at [http://localhost:3000](http://localhost:3000)
- The backend runs at [http://localhost:5000](http://localhost:5000)

---

## 🔑 Environment Variables

**Backend (.env):**
```
MONGODB_URI=your_mongodb_atlas_uri
PORT=5000
JWT_SECRET=your_jwt_secret
```

---

## 👤 Default Admin User
- Register a new user and set their role to `admin` via the User Management page (admin only).
- Or, insert an admin user directly in MongoDB.

---

## 📊 Reporting & Analytics
- Dashboard with animated charts for top-selling drugs and entity distribution
- Generate reports for prescriptions, sales, and more (customizable)

---

## 🌙 Dark Mode
- Toggle dark/light mode from the topbar
- Theme is applied instantly across the app

---

## 📦 Export Data
- Export any table to CSV with a single click

---

## 🛡️ Security
- JWT authentication for all protected routes
- Role-based access for admin/user
- Secure password hashing

---

## 💡 Customization
- Easily add new entities, reports, or analytics
- Theming and branding can be customized in `theme.js`

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
[MIT](LICENSE)

---

## 🙏 Acknowledgements
- [Material-UI](https://mui.com/)
- [Chart.js](https://www.chartjs.org/)
- [notistack](https://iamhosseindhv.com/notistack)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

