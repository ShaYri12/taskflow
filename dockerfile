FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm

# Install PHP extensions required for Laravel
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy application files
COPY . .

# Install PHP dependencies (no dev, optimized)
RUN composer install --no-dev --optimize-autoloader

# Install Node dependencies and build frontend assets
RUN npm ci
RUN npm run build

# Set permissions for Laravel storage and cache
RUN chmod -R 775 storage bootstrap/cache

EXPOSE $PORT

# Run migrations then start the server
CMD php artisan migrate --force && php artisan serve --host 0.0.0.0 --port ${PORT:-10000}
