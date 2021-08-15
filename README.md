# Exams Repo Backend API

Exams Repo is a REST API built to manage the share of old exams between students. Along with getting and posting exams, the API can sign AWS put requests for client-side uploading. You can check out the frontend repo that consumes this API [here](https://github.com/vitorelourenco/examsrepo-frontend)

## Live Demo
[front end app consuming this API](examsrepo-front.vercel.app)  
Please note: the UI is intentionally disorienting

## Built With
- TypeScript, Node.js , Express.js , PostgreSQL 

## Tested With
- Jest , supertest

## Instalation
- This project was built using Node v14.16.1 , make sure you have a compatible version of Node installed - [install node](https://nodejs.org/en/download/) . You can check your version of Node by running
```bash
$ node --version
```
- If you already have Node but do not wish to upgrade, please checkout NVM [here](https://github.com/nvm-sh/nvm/blob/master/README.md)
- You'll also need git installed to clone this repo - [install git](https://git-scm.com/downloads)
- The database is built with PostgreSQL which you should also have - [install postgres](https://www.postgresql.org/download/)
- Having done all the steps above, clone this repository
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
- Repeat the step above for a .env.test file. Please read the documentation provided by the DOTENV people on why you shouldn't normally have two .env files [here](https://www.npmjs.com/package/dotenv) . It is not an issue for this project. 


## Running the app in dev mode
```bash
$ npm run dev 
```

## Running tests
```bash
$ npm run test
```

## Building
```bash
$ npm run build
```

## Running Build
```bash
$ npm start
```

## Author

👤 **Vitor Emanuel Lourenco**

- GitHub: [@vitorelourenco](https://github.com/vitorelourenco)
- Twitter: [@Vitorel](https://twitter.com/Vitorel)
- LinkedIn: [vitoremanuellourenco](https://www.linkedin.com/in/vitoremanuellourenco/)

## 🤝 Contributing

Feel free to check the [issues page](https://github.com/vitorelourenco/my-wallet-back/issues).

## Show your support

Give a ⭐️ if you like this project!
