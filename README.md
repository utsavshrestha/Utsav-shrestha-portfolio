# Utsav Shrestha - Personal Portfolio

A full-stack, dynamic personal portfolio website built with React, Express, and Tailwind CSS. It features a custom admin panel to manage blogs, reading lists, gaming logs, and projects, with data stored in Turso (libSQL) and images hosted on Cloudinary.

## 🚀 Features

- **Dynamic Content Management**: Add, edit, and delete projects, blogs, books, and games via a secure admin dashboard.
- **Cloud Storage**: Images are uploaded and served via Cloudinary.
- **Edge Database**: Powered by Turso (libSQL) for lightning-fast, globally distributed data access.
- **Vercel Ready**: Configured for seamless serverless deployment on Vercel.
- **Responsive Design**: Built with Tailwind CSS for a flawless mobile and desktop experience.
- **Interactive UI**: Smooth animations using Framer Motion.

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: Node.js, Express
- **Database**: Turso (libSQL / SQLite)
- **Image Hosting**: Cloudinary & Multer

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file locally, and to your Vercel project settings for production:

```env
# Admin Panel Password (Choose a secure password)
ADMIN_PASSWORD=your_secure_password

# Turso Database (Get these from turso.tech)
TURSO_DATABASE_URL=libsql://your-db-url.turso.io
TURSO_AUTH_TOKEN=your_turso_auth_token

# Cloudinary Image Hosting (Get these from cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 💻 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your `.env` file**
   Create a `.env` file in the root directory and add the variables listed above. If you don't provide Turso credentials locally, the app will automatically fall back to a local `database.db` file for testing.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## 🌐 Deployment (Vercel)

This project is pre-configured for Vercel deployment using `vercel.json`.

1. Push your code to GitHub.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. In the configuration step, open the **Environment Variables** section and paste your keys (`ADMIN_PASSWORD`, `TURSO_DATABASE_URL`, etc.).
5. Click **Deploy**.

## 👨‍💻 Author
**Utsav Shrestha**
- Senior Data Engineer
- [LinkedIn](https://www.linkedin.com/in/utsav-shrestha-770430141/)
- [GitHub](https://github.com/shresthau96)
