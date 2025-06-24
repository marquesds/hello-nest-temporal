# Hello NestJS Temporal
A simple hello world project created with NestJS and Temporal running both (server and worker) in the same process.

## Installing
```shell
$ pnpm install
```

## Executing Temporal Server
```shell
$ temporal server start-dev
```

## Running Both NestJS Server and Temporal Worker
```shell
$ pnpm run start:dev
```

## Running The Example
```shell
$ curl -X POST http://localhost:3000/temporal/hello-world \
    -H "Content-Type: application/json" \
    -d '{"name": "John Doe"}'
```