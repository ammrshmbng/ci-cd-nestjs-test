# Todo API

REST API sederhana untuk mengelola todo. Data disimpan di memori, jadi akan
hilang saat aplikasi dimulai ulang.

## Menjalankan aplikasi

```bash
npm install
npm run start:dev
```

Server berjalan di `http://localhost:3000`. Port bisa diatur lewat environment
variable `PORT`.

## Endpoint

| Method | Path | Keterangan |
| --- | --- | --- |
| `POST` | `/todos` | Membuat todo dengan `title` wajib berupa string tidak kosong |
| `GET` | `/todos` | Mengambil semua todo |
| `GET` | `/todos/:id` | Mengambil satu todo berdasarkan ID |
| `PATCH` | `/todos/:id` | Mengubah `title` dan/atau `done` |
| `DELETE` | `/todos/:id` | Menghapus todo |

Contoh membuat todo:

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"belajar CI/CD"}'
```

## Pemeriksaan lokal

```bash
npm run lint
npm run test
npm run test:e2e
npm run build
```
# ci-cd-nestjs-test
