# 🍴 Recipe App

A full-stack recipe sharing web application built with **Next.js, React, Node.js, Express.js, MongoDB, Firebase Authentication, and Cloudinary**.

The application allows users to discover recipes, search for recipes, save and like their favorite recipes, post their own recipes, and interact with other users through comments.

---

## 🌐 Project Overview

Recipe App is designed to provide a simple and user-friendly platform for discovering and sharing food recipes.

Users can:

* Browse different recipes
* Search for recipes
* Filter recipes by category
* View complete recipe details
* Like recipes
* Save recipes
* Comment on recipes
* Create and upload their own recipes
* Manage their profile
* Login using email/password or Google
* Upload recipe images
* Interact with other users

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* Logout
* Google Authentication
* JWT-based authentication
* Protected routes
* User session management

### 🍳 Recipes

* View all recipes
* View individual recipe details
* Add new recipes
* Upload recipe images
* Recipe ingredients
* Recipe description
* Recipe categories
* Veg / Non-Veg / Mixed recipes
* Breakfast
* Lunch
* Dinner
* Snacks
* Chinese and other categories

### ❤️ Like System

* Like recipes
* Unlike recipes
* Check like status
* View liked recipes

### 🔖 Save System

* Save recipes
* Remove saved recipes
* Check saved status
* View saved recipes

### 💬 Comment System

* Add comments
* Delete comments
* Reply to comments
* Nested comments
* User profile information with comments

### 👤 User Profile

* View profile
* Update profile
* Upload profile image
* Manage user information
* View user's recipes

### 🔎 Search

* Search recipes
* Search using recipe names
* Filter and discover recipes

### 📊 Admin Dashboard

* Dashboard statistics
* Recipe management
* Category management
* User-related management

### ☁️ Image Upload

Recipe and profile images are uploaded and stored using **Cloudinary**.

---

# 🛠️ Tech Stack

## Frontend

* Next.js
* React
* JavaScript
* Tailwind CSS
* SWR
* Firebase Authentication
* React Toastify
* Lucide React

## Backend

* Node.js
* Express.js
* JavaScript / ES Modules
* MongoDB
* Mongoose
* JWT
* Cookie Parser
* Multer
* CORS

## External Services

* MongoDB Atlas
* Firebase
* Cloudinary

---

# 📁 Project Structure

```text
recipe-app/
│
├── frontend/
│   │
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Then:

```bash
cd recipe-app
```

---

# 💻 Frontend Setup

Go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:3000
```

---

# 🖥️ Backend Setup

Open another terminal.

Go to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

# 🔐 Environment Variables

Environment variables are required for the application to work correctly.

> ⚠️ Never upload `.env` or `.env.local` files to GitHub.

---

## Frontend Environment Variables

Create:

```text
frontend/.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

---

## Backend Environment Variables

Create:

```text
backend/.env
```

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Add any additional environment variables required by your backend configuration.

---

# 📡 API Endpoints

## Authentication

```text
GET    /api/auth/me
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
```

## Recipes

```text
GET    /api/recipe/all
GET    /api/recipe/:id
POST   /api/recipe/add
```

## Categories

```text
GET    /api/category/all
POST   /api/category/add
PUT    /api/category/update
DELETE /api/category/delete
```

## Likes

```text
POST   /api/like/toggle
GET    /api/like/status
GET    /api/like/recipes/:userId
```

## Saved Recipes

```text
POST   /api/save/toggle
GET    /api/save/status
GET    /api/save/saved-recipes
```

## Comments

```text
POST   /api/comments
GET    /api/comments/recipe/:id
DELETE /api/comments/:id
```

> API routes may change as the project evolves. Refer to the backend `routes` directory for the latest implementation.

---

# 🗄️ Database

The application uses **MongoDB** with **Mongoose**.

Main data models include:

```text
User
Recipe
Category
Comment
Like
Save
```

MongoDB Atlas can be used for the production database.

---

# ☁️ Cloudinary

Cloudinary is used for storing:

* Recipe images
* Profile images
* Other uploaded media

The Cloudinary credentials should be stored inside the backend `.env` file.

---

# 🔥 Firebase Authentication

Firebase is used for authentication features such as:

* Google Login
* User authentication
* Firebase user identity

Firebase configuration should be stored using environment variables.

---

# 🚀 Deployment

The recommended production architecture is:

```text
                    GitHub
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
           Vercel             Render
              │                 │
              ▼                 ▼
          Next.js            Express.js
                                │
                                ▼
                         MongoDB Atlas
                                │
                                ▼
                           Cloudinary
```

## Frontend

Recommended:

**Vercel**

Deploy the `frontend` folder as the Next.js application.

## Backend

Recommended:

**Render**

Deploy the `backend` folder as the Node.js/Express application.

## Database

Recommended:

**MongoDB Atlas**

Use the MongoDB Atlas connection string in the backend environment variables.

## Image Storage

Recommended:

**Cloudinary**

Use Cloudinary for image uploads and storage.

---

# 🌍 Production API URL

During development:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

After deployment, change it to your production backend:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

For example:

```env
NEXT_PUBLIC_API_URL=https://recipe-api.onrender.com/api
```

> Use your actual deployed backend URL instead of the example URL.

---

# ⚠️ Important Security Rules

Never upload sensitive credentials to GitHub.

Do NOT commit:

```text
.env
.env.local
.env.production
Firebase private keys
MongoDB passwords
JWT secrets
Cloudinary API secrets
Service account JSON files
```

Make sure your `.gitignore` contains:

```gitignore
node_modules/
.env
.env.local
.env.*.local
.next/
dist/
build/
*.log
```

---

# 📸 Screenshots

Add screenshots of the application here.

Recommended screenshots:

```text
screenshots/
│
├── home.png
├── recipe-details.png
├── login.png
├── profile.png
├── saved-recipes.png
└── admin-dashboard.png
```

Example:

```markdown
![Home Page](./screenshots/home.png)
```

---

# 🎯 Future Improvements

Planned features:

*  Advanced recipe search
*  Better recommendation system
*  Recipe sharing
*  Improved notification system
*  Recipe video support
*  Advanced admin controls
*  Performance optimization
*  SEO improvements
*  Progressive Web App support
*  AI-based recipe recommendations

---

# 🤝 Contributing

Contributions are welcome.

To contribute:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Create a new branch:

```bash
git checkout -b feature/new-feature
```

Make your changes and commit:

```bash
git add .
git commit -m "Add new feature"
```

Push the branch:

```bash
git push origin feature/new-feature
```

Then create a Pull Request on GitHub.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Your Name**

Full Stack Developer

Built with ❤️ using Next.js, Node.js, Express.js and MongoDB.
