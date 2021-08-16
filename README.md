# Exams Repo Backend API

Exams Repo is a REST API built to manage the share of old exams between students. Along with getting and posting exams, the API can sign AWS put requests for client-side uploading. You can check out the frontend repo that consumes this API [here](https://github.com/vitorelourenco/examsrepo-frontend)

## Live Demo
[front end app consuming this API](https://examsrepo-front.vercel.app/)  
Please note:  
The backend is hosted on Heroku free, it takes a while for it to wake up  
The UI is intentionally disorienting to discourage Instructors from digging into

## Features
- List all the exams for a given combination of Degree and Instructor 
- List all the exams for a given combination of Degree and Class 
- Add a new exam to the database with a link to the exam file
- Upload a new exam
- Add a new degree

## Why?
Examinations don't have to be a guesser's game. If some people know how an Instructor has been evaluating their students, why shouldn't all people know? Students all over the world see it this way, but they keep storing these exams in some messy drive. Exams Repo organizes the exams by degree, professor and class. It will also further classify the exams based on it's semester and category. Exams Repo can be used to help students get straight to the point. Here's what to study, now go ahead and ace it!

## Built With
- TypeScript, Node.js , Express.js , PostgreSQL 

## Tested With
- Jest , supertest

## Instalation
- This project was built using [Node](https://nodejs.org/en/download/) v14.16.1 , make sure you have a compatible version of Node installed. You can check your version of Node by running
```bash
$ node --version
```
- If you already have Node but do not wish to upgrade, please checkout [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md)
- The database is built with [PostgreSQL](https://www.postgresql.org/download/) which you should also have
- Once you have everything installed, clone this repository
```bash
$ git clone https://github.com/vitorelourenco/exams-repo-backend-api
```
- Navigate to the project's folder
```bash
$ cd exams-repo-backend-api
```
- Install the dependencies
```bash
$ npm i
```
- Create a database in postgres called examsrepo
```bash
$ createdb -h localhost -p 5432 -U postgres examsrepo
```
- Create a test database in postgres called examsrepotest
```bash
$ createdb -h localhost -p 5432 -U postgres examsrepotest
```
- Build the project to compile TypeScript into JavaScript
```bash
$ npm run build
```
- Run typeorm migrations to get the latest database schema
```bash
npm run typeorm migration:run
```
- Create a .env file following the template provided in .env.example , you can leave the port as is but please remember to use your postgres password in the database url. Also, the upload feature won't work without an AWS setup. You can learn how to make your own AWS s3 bucket [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html) and you can learn how to sign put requests [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/RESTAuthentication.html) . The signing code is already baked in but you'll need credentials either way. Learn how to create your AWS keys [here](https://aws.amazon.com/premiumsupport/knowledge-center/create-access-key/)

- Follow the installation steps for the [front end](https://github.com/vitorelourenco/examsrepo-frontend) if you wish to see your local version being consumed over a browser.

## Running the app in dev mode
```bash
$ npm run dev 
```

## Running tests
```bash
$ npm run test
```

## Build
```bash
$ npm run build
```

## Running the built app
(the build will not include .env files)
```bash
$ npm start
```

## Author

👤 **Vitor Emanuel Lourenco**

- GitHub: [@vitorelourenco](https://github.com/vitorelourenco)
- Twitter: [@Vitorel](https://twitter.com/Vitorel)
- LinkedIn: [vitoremanuellourenco](https://www.linkedin.com/in/vitoremanuellourenco/)

## 🔮 Possible Future Features

- As a user I want to add a new Class
- As a user I want to add a new Instructor
- As a user I want to tie an Instructor to a Class

## 🤝 Contributing

You can take a look at the Possible Future Features session and open a PR that implements them. You can also suggest other features. Feel free to check out the [issues page](https://github.com/vitorelourenco/my-wallet-back/issues).

## Show your support

Give a ⭐️ if you like this project!
