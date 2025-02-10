
<h1 align="center">✂️ URL Shortener</h1>

This is a RESTful API that allows you to shorten long URLs, redirect to the original URL, get access statistics, and manage cached URLs. The API is built with **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, and **Redis** for caching. It is also documented with **Swagger** for easy use and understanding. On the frontend side, **React + TS + Vite and Tailwind CSS were used.**

![Screenshot](https://i.ibb.co/ycXyNfk4/url-shortener-mockup.png)
---

## Table of Contents

1. [Requirements](#requirements)
2. [Configuration](#configuration)
3. [Installation](#installation)
4. [Endpoints](#endpoints)
5. [API Documentation](#api-documentation)
6. [License](#license)
---

## Requirements

- Node.js (v22.13.1 or higher)
- PostgreSQL (v16 or higher)
- Redis (v7 or higher)
- npm (v10.9.2 or higher)
- React

---

## Configuration

### 1. `.env` file

Create a `.env` file in the root of the project with the following environment variables:

```env
# Application port
PORT=5000

# PostgreSQL configuration
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=your_host
DB_PORT=your_port
DB_DATABASE=your_database
```

## 2. Redis
you need to have redis installed on your system, or other possible ways to use it is trough docker:

to run redis with docker:
```shell
docker run --name some-redis -p 6379:3379 -d redis
```

## Installation
- Clone the repository:

```bash
git clone https://github.com/AnthonyAvellaneda10/linkly.git

cd linkly
```

- Open two terminals
  - Install the dependencies and run:

```bash
cd .\backend\

npm install

npm run dev
```

```bash
cd .\frontend\

npm install

npm run dev
```

### Endpoints
---
- GET /shorten/list
- GET /shorten/:shortCode
- GET /shorten/:shortCode/stats
- GET /:shortCode
- POST /shorten
- PUT /shorten/:shortCode
- DELETE /shorten/:shortCode

### API Documentation
---
The API is documented using Swagger. You can access the documentation at:

```shell
http://localhost:5000/api-docs
```

![Swagger](https://i.ibb.co/Fk8yjdxL/swagger.png)

### License
---
This project is licensed under the MIT License. For more details, see the [LICENSE](https://github.com/twbs/bootstrap/blob/main/LICENSE) file.