import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { BLOG_POSTS, BOOKS, GAMES, PROJECTS } from "./src/data/content.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize Turso / libSQL Database
// Falls back to local file if TURSO_DATABASE_URL is not set
const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:database.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio_uploads",
    allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
  } as any,
});

const upload = multer({ storage: storage });

async function initDB() {
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      tags TEXT NOT NULL,
      imageUrl TEXT
    );

    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      category TEXT NOT NULL,
      cover TEXT NOT NULL,
      isReading INTEGER DEFAULT 0,
      rating INTEGER
    );

    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      platform TEXT NOT NULL,
      status TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      icon TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      tags TEXT NOT NULL,
      link TEXT,
      githubUrl TEXT,
      liveUrl TEXT,
      deepDiveProblem TEXT,
      deepDiveSolution TEXT,
      deepDiveOutcome TEXT,
      deepDiveArchitecture TEXT
    );
  `);

  try {
    await db.execute("ALTER TABLE books ADD COLUMN rating INTEGER");
  } catch (e) {
    // Column might already exist
  }

  // Seed initial data if tables are empty
  const blogsCount = await db.execute("SELECT COUNT(*) as count FROM blogs");
  if ((blogsCount.rows[0].count as number) === 0) {
    for (const blog of BLOG_POSTS) {
      await db.execute({
        sql: `INSERT INTO blogs (id, title, date, excerpt, content, tags, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [blog.id, blog.title, blog.date, blog.excerpt, blog.content, JSON.stringify(blog.tags), blog.imageUrl || null]
      });
    }
  }

  const booksCount = await db.execute("SELECT COUNT(*) as count FROM books");
  if ((booksCount.rows[0].count as number) === 0) {
    for (const book of BOOKS) {
      await db.execute({
        sql: `INSERT INTO books (id, title, author, category, cover, isReading, rating) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [book.id, book.title, book.author, book.category, book.cover, book.isReading ? 1 : 0, book.rating || null]
      });
    }
  }

  const gamesCount = await db.execute("SELECT COUNT(*) as count FROM games");
  if ((gamesCount.rows[0].count as number) === 0) {
    for (const game of GAMES) {
      await db.execute({
        sql: `INSERT INTO games (id, title, platform, status, imageUrl, icon) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [game.id, game.title, game.platform, game.status, game.imageUrl, game.icon]
      });
    }
  }

  const projectsCount = await db.execute("SELECT COUNT(*) as count FROM projects");
  if ((projectsCount.rows[0].count as number) === 0) {
    for (const proj of PROJECTS) {
      const id = proj.title.toLowerCase().replace(/\s+/g, '-');
      await db.execute({
        sql: `INSERT INTO projects (id, title, category, description, tags, link, githubUrl, liveUrl, deepDiveProblem, deepDiveSolution, deepDiveOutcome, deepDiveArchitecture)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id, proj.title, proj.category, proj.description, JSON.stringify(proj.tags), 
          proj.link || null, proj.githubUrl || null, proj.liveUrl || null,
          proj.deepDive?.problem || null, proj.deepDive?.solution || null,
          proj.deepDive?.outcome || null, proj.deepDive?.architecture || null
        ]
      });
    }
  }
}

// Initialize DB at top level for serverless
await initDB();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// File Upload API
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ url: req.file.path });
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@Host2026!";

// Verify Password API
app.post("/api/verify-password", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// API Routes
app.get("/api/blogs", async (req, res) => {
  const result = await db.execute("SELECT * FROM blogs ORDER BY date DESC");
  res.json(result.rows.map((b: any) => ({ ...b, tags: b.tags ? JSON.parse(b.tags) : [] })));
});

app.post("/api/blogs", async (req, res) => {
  const { password, blog } = req.body;
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: "Unauthorized" });

  const { id, title, date, excerpt, content, tags, imageUrl } = blog;
  await db.execute({
    sql: `
      INSERT INTO blogs (id, title, date, excerpt, content, tags, imageUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        title=excluded.title,
        date=excluded.date,
        excerpt=excluded.excerpt,
        content=excluded.content,
        tags=excluded.tags,
        imageUrl=excluded.imageUrl
    `,
    args: [id, title, date, excerpt, content, JSON.stringify(tags), imageUrl]
  });
  res.json({ success: true });
});

app.delete("/api/blogs/:id", async (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: "Unauthorized" });

  await db.execute({
    sql: "DELETE FROM blogs WHERE id = ?",
    args: [req.params.id]
  });
  res.json({ success: true });
});

// Books API
app.get("/api/books", async (req, res) => {
  const result = await db.execute("SELECT * FROM books");
  res.json(result.rows);
});

app.post("/api/books", async (req, res) => {
  const { password, book } = req.body;
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: "Unauthorized" });

  const { id, title, author, category, cover, isReading, rating } = book;
  await db.execute({
    sql: `
      INSERT INTO books (id, title, author, category, cover, isReading, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        title=excluded.title,
        author=excluded.author,
        category=excluded.category,
        cover=excluded.cover,
        isReading=excluded.isReading,
        rating=excluded.rating
    `,
    args: [id, title, author, category, cover, isReading ? 1 : 0, rating || null]
  });
  res.json({ success: true });
});

app.delete("/api/books/:id", async (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: "Unauthorized" });

  await db.execute({
    sql: "DELETE FROM books WHERE id = ?",
    args: [req.params.id]
  });
  res.json({ success: true });
});

// Games API
app.get("/api/games", async (req, res) => {
  const result = await db.execute("SELECT * FROM games");
  res.json(result.rows);
});

app.post("/api/games", async (req, res) => {
  const { password, game } = req.body;
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: "Unauthorized" });

  const { id, title, platform, status, imageUrl, icon } = game;
  await db.execute({
    sql: `
      INSERT INTO games (id, title, platform, status, imageUrl, icon)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        title=excluded.title,
        platform=excluded.platform,
        status=excluded.status,
        imageUrl=excluded.imageUrl,
        icon=excluded.icon
    `,
    args: [id, title, platform, status, imageUrl, icon]
  });
  res.json({ success: true });
});

app.delete("/api/games/:id", async (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: "Unauthorized" });

  await db.execute({
    sql: "DELETE FROM games WHERE id = ?",
    args: [req.params.id]
  });
  res.json({ success: true });
});

// Projects API
app.get("/api/projects", async (req, res) => {
  const result = await db.execute("SELECT * FROM projects");
  res.json(result.rows.map((p: any) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    tags: p.tags ? JSON.parse(p.tags) : [],
    link: p.link,
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    deepDive: {
      problem: p.deepDiveProblem,
      solution: p.deepDiveSolution,
      outcome: p.deepDiveOutcome,
      architecture: p.deepDiveArchitecture
    }
  })));
});

app.post("/api/projects", async (req, res) => {
  const { password, project } = req.body;
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: "Unauthorized" });

  const { id, title, category, description, tags, link, githubUrl, liveUrl, deepDive } = project;
  try {
    await db.execute({
      sql: `
        INSERT INTO projects (id, title, category, description, tags, link, githubUrl, liveUrl, deepDiveProblem, deepDiveSolution, deepDiveOutcome, deepDiveArchitecture)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          title=excluded.title,
          category=excluded.category,
          description=excluded.description,
          tags=excluded.tags,
          link=excluded.link,
          githubUrl=excluded.githubUrl,
          liveUrl=excluded.liveUrl,
          deepDiveProblem=excluded.deepDiveProblem,
          deepDiveSolution=excluded.deepDiveSolution,
          deepDiveOutcome=excluded.deepDiveOutcome,
          deepDiveArchitecture=excluded.deepDiveArchitecture
      `,
      args: [
        id, title, category, description, JSON.stringify(tags || []), link || null, githubUrl || null, liveUrl || null,
        deepDive?.problem || null, deepDive?.solution || null,
        deepDive?.outcome || null, deepDive?.architecture || null
      ]
    });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: "Unauthorized" });

  try {
    await db.execute({
      sql: "DELETE FROM projects WHERE id = ?",
      args: [req.params.id]
    });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Vite middleware for development
if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  // Static serving for non-Vercel production environments
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

// Only listen if not running on Vercel
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
