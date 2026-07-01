# Docker Learning Notes

## What is Docker?

Docker is a tool used to package an application with everything it needs:
- Code
- Runtime
- Libraries
- Dependencies

into a container.

Flow:

```
Code
  |
  v
Dockerfile
  |
  v
Image
  |
  v
Container
  |
  v
Application
```

---

# Basic Docker Commands

## Check Docker Version

```bash
docker --version
```

---

## Check Docker Information

```bash
docker info
```

---

# Images

## List Images

```bash
docker images
```

or

```bash
docker image ls
```

---

## Create Image

```bash
docker build -t app-name .
```

Example:

```bash
docker build -t school .
```

Meaning:

- `-t` gives image name
- `.` current folder Dockerfile


---

## Remove Image

```bash
docker rmi image-name
```

Example:

```bash
docker rmi school
```

---

# Containers

## Run Container

```bash
docker run image-name
```

Example:

```bash
docker run school
```

---

## Run With Port

```bash
docker run -p HOST:CONTAINER image-name
```

Example:

```bash
docker run -p 8080:80 school
```

Meaning:

```
localhost:8080
       |
       v
container port 80
```

---

## Run Container Background

```bash
docker run -d image-name
```

---

## List Running Containers

```bash
docker ps
```

---

## List All Containers

```bash
docker ps -a
```

---

## Stop Container

```bash
docker stop container-name
```

---

## Start Container

```bash
docker start container-name
```

---

## Remove Container

```bash
docker rm container-name
```

---

# Container Logs

See logs:

```bash
docker logs container-name
```

Live logs:

```bash
docker logs -f container-name
```

---

# Enter Container

```bash
docker exec -it container-name bash
```

Example:

```bash
docker exec -it school bash
```

---

# Docker Compose

Docker Compose runs multiple containers together.

Example:

```
React
 |
PHP
 |
MySQL
```

---

## Start Project

```bash
docker compose up
```

---

## Build And Start

```bash
docker compose up --build -d
```

This will:

1. Read docker-compose.yml
2. Build images
3. Create containers
4. Start services


---

## Stop Project

```bash
docker compose down
```

---

## Check Compose Containers

```bash
docker compose ps
```

---

## View Compose Logs

```bash
docker compose logs
```

---

# Dockerfile Example

```dockerfile
FROM php:8.2-apache

WORKDIR /var/www/html

COPY . .

RUN docker-php-ext-install mysqli

EXPOSE 80

CMD ["apache2-foreground"]
```

---

# MySQL Container Example

```yaml
services:

 db:
   image: mysql:8

   environment:
     MYSQL_ROOT_PASSWORD: root
     MYSQL_DATABASE: docker

   ports:
     - "3306:3306"
```

---

# Volumes

Volumes keep data after container delete.

Check:

```bash
docker volume ls
```

Remove:

```bash
docker volume rm volume-name
```

---

# Networks

List networks:

```bash
docker network ls
```

Containers communicate using network names.

Example:

```
PHP container

DB_HOST=db

MySQL container name=db
```

---

# Clean Docker

Remove stopped containers:

```bash
docker container prune
```

Remove unused images:

```bash
docker image prune
```

Remove unused everything:

```bash
docker system prune
```

---

# Full Project Example

Structure:

```
project/

Dockerfile

docker-compose.yml

frontend/
   React

api/
   PHP

database/
   MySQL
```

Run:

```bash
docker compose up --build -d
```

Open:

```
http://localhost:8080
```

---

# Useful Commands Cheat Sheet

```
docker images

docker ps

docker ps -a

docker build -t name .

docker run -p 8080:80 name

docker stop name

docker rm name

docker logs name

docker exec -it name bash

docker compose up --build -d

docker compose down
```
