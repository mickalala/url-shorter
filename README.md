# Url Shorter 
## Description
URL Shorter is a RESTful API where links are modified to smaller links. It's a back-end project where the user can register, login and some routes are authenticated.
Password in sign-up must be a strong password.After the user logs in, a token is generated and must be used to access authorized routes.

## Features

- [x] Sign-Up (localhost:3000/signup)
- [x] Sign-In(localhost:3000/signin)
- [x] Create shorter url(localhost:3000/urls)
- [x] Acces to shorter url(localhost:3000/:code)
- [x] Get All user urls(localhost:3000/urls/all)
- [x] Update user urls(localhost:3000/urls/:id)
- [x] Delete user urls(localhost:3000/urls/:id)
- [ ] Tests


## How to use
1. Clone this repository
2. Install dependencies
```bash
$ npm i
```

3. Setup your environment variables (.env)

4. Create your database with prisma
```bash
$ npx prisma migrate dev
$ npx prisma generate
```

5. Run the app as developer mode
```bash
# development
$ npm run dev
```

6. Build the app
```bash
#production
$ npm run build
```
7. start
```bash
#production
$ npm run start
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Improvement Points

As an area for improvement, I see that an interesting point would be to make a request to an API that has the function of creating shorter links and providing that link, since the link can only be accessed when the URL-shortening API is running.
Similarly, both unit and integration tests could be added.