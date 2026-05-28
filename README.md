# Blog API Backend Test
Created by:
Salsabil Salwa Putri Maharani

---

# Panduan Instalasi & Persiapan

## 1. Instalasi Dependensi

Jalankan perintah berikut di terminal untuk memasang seluruh dependency yang dibutuhkan:

```bash
npm install
```

---

## 2. Konfigurasi Environment Variables (`.env`)

Buat file bernama `.env` pada root project, lalu isi dengan konfigurasi berikut:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=blog_api
DB_USER=root
DB_PASS=

JWT_SECRET=isi_secret_key_disini
PORT=3000
```

---

## 3. Persiapan Database (Migration)

### Environment Development

```bash
# Membuat database
npx sequelize-cli db:create

# Menjalankan migration tabel
npx sequelize-cli db:migrate
```

### Environment Test

```bash
# Membuat database untuk testing
npx sequelize-cli db:create --env test

# Menjalankan migration untuk database testing
npx sequelize-cli db:migrate --env test
```

# Cara Menjalankan Aplikasi

## Run Development Server

```bash
npm run dev
```

## Run Production Server

```bash
npm start
```

---

# Unit Test

```bash
npm test
```

---

# Authentication Endpoints

## 1. Register User

* **URL:** `/api/auth/register`
* **Method:** `POST`

### Request Body

```json
{
  "name": "Budi Santoso",
  "email": "budi@example.com",
  "password": "password123"
}
```

### Success Response (201 Created)

```json
{
  "message": "Register berhasil",
  "data": {
    "id": 1,
    "name": "Budi Santoso",
    "email": "budi@example.com"
  }
}
```

---

## 2. Login User

* **URL:** `/api/auth/login`
* **Method:** `POST`

### Request Body

```json
{
  "email": "budi@example.com",
  "password": "password123"
}
```

### Success Response (200 OK)

```json
{
  "message": "Login berhasil",
  "token": "your_jwt_token",
  "data": {
    "id": 1,
    "name": "Budi Santoso",
    "email": "budi@example.com"
  }
}
```

---

# Post Endpoints

## 3. Get All Posts

* **URL:** `/api/posts`
* **Method:** `GET`

### Success Response (200 OK)

```json
{
  "message": "Berhasil mengambil semua post",
  "data": [
    {
      "id": 1,
      "content": "Ini postingan pertama saya!",
      "authorId": 1,
      "createdAt": "2026-05-28T16:00:00.000Z",
      "updatedAt": "2026-05-28T16:00:00.000Z",
      "author": {
        "id": 1,
        "name": "Budi Santoso",
        "email": "budi@example.com"
      }
    }
  ]
}
```

---

## 4. Get Post By ID

* **URL:** `/api/posts/:id`
* **Method:** `GET`

### Success Response (200 OK)

```json
{
  "message": "Berhasil mengambil detail post",
  "data": {
    "id": 1,
    "content": "Ini postingan pertama saya!",
    "authorId": 1,
    "createdAt": "2026-05-28T16:00:00.000Z",
    "updatedAt": "2026-05-28T16:00:00.000Z",
    "author": {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@example.com"
    }
  }
}
```

---

## 5. Create New Post

* **URL:** `/api/posts`
* **Method:** `POST`

### Headers

```txt
Authorization: Bearer <token>
```

### Request Body

```json
{
  "content": "Ini konten post yang baru dibuat."
}
```

### Success Response (201 Created)

```json
{
  "message": "Post berhasil dibuat",
  "data": {
    "id": 2,
    "content": "Ini konten post yang baru dibuat.",
    "authorId": 1,
    "updatedAt": "2026-05-28T16:05:00.000Z",
    "createdAt": "2026-05-28T16:05:00.000Z"
  }
}
```

---

## 6. Update Post

* **URL:** `/api/posts/:id`
* **Method:** `PUT`

### Headers

```txt
Authorization: Bearer <token>
```

### Request Body

```json
{
  "content": "Konten post setelah diperbarui."
}
```

### Success Response (200 OK)

```json
{
  "message": "Post berhasil diupdate",
  "data": {
    "id": 2,
    "content": "Konten post setelah diperbarui.",
    "authorId": 1,
    "createdAt": "2026-05-28T16:05:00.000Z",
    "updatedAt": "2026-05-28T16:10:00.000Z"
  }
}
```

---

## 7. Delete Post

* **URL:** `/api/posts/:id`
* **Method:** `DELETE`

### Headers

```txt
Authorization: Bearer <token>
```

### Success Response (200 OK)

```json
{
  "message": "Post berhasil dihapus"
}
```
