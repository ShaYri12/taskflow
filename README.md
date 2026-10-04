# TaskFlow

A modern task management application built with **Laravel 13**, **Inertia.js v3**, and **React**. Each user has their own private workspace — register, log in, and manage tasks that only you can see.

---

## ✨ Features

- 🔐 **Authentication** — register, log in, remember me, and sign out
- 👤 **Account settings** — update name, email, and password; delete account
- 📝 **Task management** — create, edit, and delete tasks
- 🎯 **Priorities** — Low, Medium, High
- 📊 **Status tracking** — Pending, In Progress, Completed
- 📅 **Due dates** — set and filter by deadline
- 🔍 **Search & filters** — filter tasks by keyword, status, and priority
- 🌗 **Dark mode** — toggle from the header or the login/register page
- 🔒 **Per-user isolation** — every task is scoped to its owner; no one else can read, edit, or delete it

---

## 🛠 Tech Stack

| Layer           | Technology           |
| --------------- | -------------------- |
| Backend         | PHP 8.3+, Laravel 13 |
| Frontend bridge | Inertia.js v3        |
| Frontend        | React 19, TypeScript |
| Styling         | Tailwind CSS v4      |
| Database        | MySQL                |
| Build tool      | Vite (via vite-plus) |
| Typed routes    | Laravel Wayfinder    |

---

## 🚀 Local setup

### Prerequisites

- PHP 8.3+
- Composer
- Node.js 20+ and npm
- MySQL (or compatible) database

### Steps

```bash
# 1. Clone the repo
git clone <your-repo-url> taskflow
cd taskflow

# 2. Install PHP dependencies
composer install

# 3. Copy and configure the environment
cp .env.example .env

# 4. Generate an application key
php artisan key:generate

# 5. Configure your database in .env
#    DB_CONNECTION=mysql
#    DB_HOST=127.0.0.1
#    DB_PORT=3306
#    DB_DATABASE=taskflow
#    DB_USERNAME=root
#    DB_PASSWORD=

# 6. Run migrations
php artisan migrate

# 7. Install Node dependencies and build assets
npm install
npm run build

# 8. Serve the application
php artisan serve
```

Visit `http://localhost:8000` — you'll be redirected to the login page.

---

## 🗂 Project structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── AuthController.php      # login, register, logout
│   │   ├── ProfileController.php   # account settings, delete account
│   │   └── TaskController.php      # full task CRUD scoped per user
│   ├── Middleware/
│   │   └── HandleInertiaRequests.php  # shares auth.user + flash to frontend
│   └── Requests/
│       ├── LoginRequest.php
│       └── RegisterRequest.php
├── Models/
│   ├── Task.php                    # belongsTo User
│   └── User.php                   # hasMany Tasks
└── Policies/
    └── TaskPolicy.php             # ownership check for edit/delete

resources/js/
├── app.tsx                        # Inertia bootstrap
├── layouts/
│   └── AppLayout.tsx              # sticky header, user dropdown, theme toggle
├── components/
│   ├── ThemeToggle.tsx            # reusable dark/light toggle button
│   └── TaskDetailModal.tsx        # task detail slide-over
└── pages/
    ├── Auth/
    │   ├── Login.tsx
    │   └── Register.tsx
    ├── Profile/
    │   └── Edit.tsx               # name/email, password, delete account
    └── Tasks/
        ├── Index.tsx              # list with search, filters, bulk delete
        ├── Create.tsx
        └── Edit.tsx

routes/
└── web.php                        # guest group + auth group
```

---

## 🔑 Routes

| Method   | URL                  | Description              |
| -------- | -------------------- | ------------------------ |
| `GET`    | `/login`             | Login page               |
| `POST`   | `/login`             | Authenticate user        |
| `GET`    | `/register`          | Register page            |
| `POST`   | `/register`          | Create account           |
| `POST`   | `/logout`            | Sign out                 |
| `GET`    | `/tasks`             | Task list (auth)         |
| `GET`    | `/tasks/create`      | New task form (auth)     |
| `POST`   | `/tasks`             | Store task (auth)        |
| `GET`    | `/tasks/{task}/edit` | Edit task form (auth)    |
| `PUT`    | `/tasks/{task}`      | Update task (auth)       |
| `DELETE` | `/tasks/{task}`      | Delete task (auth)       |
| `GET`    | `/profile`           | Account settings (auth)  |
| `PATCH`  | `/profile/info`      | Update name/email (auth) |
| `PATCH`  | `/profile/password`  | Change password (auth)   |
| `DELETE` | `/profile`           | Delete account (auth)    |

---

## 🔒 Security highlights

- Passwords hashed with bcrypt via Laravel's `hashed` cast
- Session regenerated on login and invalidated on logout
- CSRF protection on all state-changing routes (Inertia handles the token)
- Task ownership enforced at both the query level (`user()->tasks()`) and via `TaskPolicy`
- Password confirmation required before deleting account

---

## 🌐 Deployment (shared hosting / InfinityFree)

1. Run `composer install --no-dev --optimize-autoloader` and `npm run build` locally
2. Zip the project (excluding `node_modules/` and `.git/`)
3. Upload the zip to `htdocs/` on your host and extract it there
4. Move `public/build/` up to `htdocs/build/`
5. Edit `htdocs/index.php` — change `__DIR__.'/../...'` paths to `__DIR__.'/...'`
6. Add `$app->usePublicPath(__DIR__);` before `handleRequest`
7. Upload your `.env` with production values (set `SESSION_DRIVER=file`, `CACHE_STORE=file`)
8. Run migrations via phpMyAdmin or `php artisan migrate` over SSH

For container platforms (Render, Railway, Caasify, Fly.io) use the included `Dockerfile` — it installs dependencies, builds assets, runs migrations on startup, and serves on `$PORT`.

---

## 📄 License

MIT
