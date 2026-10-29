# Todo API

A simple REST API for managing todos. Data is stored in memory, so it will be
lost when the application restarts.

## Run the application

```bash
npm install
npm run start:dev
```

The server runs at `http://localhost:3000`. You can configure the port using
the `PORT` environment variable.

## Endpoint

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/todos` | Create a todo with a required, non-empty string `title` |
| `GET` | `/todos` | Get all todos |
| `GET` | `/todos/:id` | Get a todo by ID |
| `PATCH` | `/todos/:id` | Update the `title` and/or `done` status |
| `DELETE` | `/todos/:id` | Delete a todo |

Example: create a todo

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"learn CI/CD"}'
```

## Run the local checks

```bash
npm run lint
npm run test
npm run test:e2e
npm run build
```
# ci-cd-nestjs-test
