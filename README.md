# Translator service

## Prerequisites

To have installed:

- Nodejs
  ```
  https://nodejs.org/en/download/
  ```
- Mongodb

  ```
  https://docs.mongodb.com/manual/installation/
  ```

- Elasticsearch

  ```
  https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started-install.html
  ```

For deployment you should have installed docker and docker-compouse in your computer.

  ```
  https://docs.docker.com/compose/install/
  ```

## Deploiment

```
docker-compose up --build
```

## Run locally

1- Install dependencies on each project folder (client and server)

```bash
    npm install
```

2- Create a .env file and copy the content of .env.tmpl then change the paramaters for your own

3- Run each application

- Client application

```bash
    npm run serve
```

- Backend application

```bash
    npm run start
```

## Running the tests

- Client application

```bash
    npm run test:e2e
```

- Backend application

```bash
    npm run test
```

## Posible issues
- The server was configured to use http and https, for the https I used a self signed certificate, so it can give problems with some browsers like Chrome, when configuring the client .env file if you haven accepted the ssl connection it wont work, in this case use http protocol.

- When configuring .env file use / at the end of the api url.
