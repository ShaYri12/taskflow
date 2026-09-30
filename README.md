# TaskFlow - Laravel Task Management Application

A modern task management application built with Laravel 13, Inertia.js 3, and React.

## ✨ Features

- 📝 Create, edit, and delete tasks
- 🎯 Set task priorities (Low, Medium, High)
- 📊 Track task status (Pending, In Progress, Completed)
- 📅 Set due dates
- 🔍 Search and filter tasks
- 🌙 Dark mode support
- 📱 Responsive design

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/taskflow.git
   cd taskflow
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Setup environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Setup database**
   ```bash
   touch database/database.sqlite
   php artisan migrate
   ```

5. **Build assets and start server**
   ```bash
   npm run dev
   php artisan serve
   ```

6. **Visit** http://localhost:8000

## 🌐 Free Deployment

Deploy for FREE on Railway.app! See deployment guides:

- **Quick Start**: [RAILWAY-QUICK-START.md](RAILWAY-QUICK-START.md)
- **Full Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

### One-Line Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/yourusername/taskflow)

## 🛠️ Tech Stack

- **Backend**: Laravel 13 (PHP 8.3)
- **Frontend**: React 18 with TypeScript
- **Routing**: Inertia.js 3
- **Styling**: Tailwind CSS
- **Database**: SQLite (local), PostgreSQL (production)
- **Build Tool**: Vite

## 📦 Project Structure

```
taskflow/
├── app/                    # Laravel application logic
│   ├── Http/Controllers/   # Controllers
│   └── Models/             # Eloquent models
├── resources/
│   ├── js/
│   │   ├── components/     # React components
│   │   ├── layouts/        # Layout components
│   │   └── pages/          # Inertia pages
│   └── css/                # Stylesheets
├── routes/                 # Application routes
├── database/
│   └── migrations/         # Database migrations
└── tests/                  # Tests
```

## 🧪 Testing

```bash
# Run all tests
php artisan test

# Run with coverage
php artisan test --coverage

# Run specific test
php artisan test --filter=ExampleTest
```

## 📝 Code Quality

```bash
# Format code
composer run lint

# Check formatting
composer run lint:check

# Type checking
composer run types:check

# Full CI check
composer run ci:check
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 🆘 Support

Need help? Check out:
- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com/)
- [Railway Documentation](https://docs.railway.app/)

---

Built with ❤️ using Laravel and React
