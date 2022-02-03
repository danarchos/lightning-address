# Authentication Microservice

- JWT tokens
- Own Database with mongodb
- Docker
- Docker Compose to orchestrate both db and auth service

Add .env

```
JWT_EXPIRE=30
JWT_SECRET=CreateARandomString4723913012
```

To start:

```
docker-compose up --build
```
