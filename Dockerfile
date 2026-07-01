# Stage 1: Build the React frontend
FROM node:20-alpine AS build
WORKDIR /app

# Copy frontend package files and install dependencies
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copy frontend source code and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Serve PHP API and built frontend with Apache
FROM php:8.2-apache
WORKDIR /var/www/html

# Install required PHP extensions (mysqli for database connection)
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Enable Apache mod_rewrite for React Router
RUN a2enmod rewrite

# Copy built frontend from Stage 1
COPY --from=build /app/frontend/dist/ /var/www/html/

# Copy PHP API files
COPY api/ /var/www/html/api/

# Add .htaccess to route React frontend requests to index.html
RUN echo '<IfModule mod_rewrite.c>\n\
    RewriteEngine On\n\
    RewriteBase /\n\
    RewriteRule ^index\\.html$ - [L]\n\
    RewriteCond %{REQUEST_FILENAME} !-f\n\
    RewriteCond %{REQUEST_FILENAME} !-d\n\
    RewriteCond %{REQUEST_URI} !^/api/\n\
    RewriteRule . /index.html [L]\n\
</IfModule>' > /var/www/html/.htaccess

# Expose port 80
EXPOSE 80
