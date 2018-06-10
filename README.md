## MEAN Stack using Angular 5

This application was created in order to show how we can create a MEAN stack application from scratch where the frontend and the backend are completely seperated from each other and can be easily replaced. This application uses MongoDB, ExpressJS, Angular 5, and NodeJS.

## Requirements

- NodeJS
- MongoDB
- @angular/cli

## Description

The main focus of this application is to demonstrate three layers. the parent layer where it has its own package.json file and once run, it will run the web and the api layers at the same time. the api layer where you can run it on its own, and a web layer where you can run it on its own also.
Comming soon will be adding few pages to the angular app in order o perform CRUD operation using the api.

## Installation

There are 3 package.json files in this application

1 - Install all dependencies in package.json file in the parent directory. This can be done by navigating to the root directory in the command line interface and running the following command.
```
$ npm install
```

3 - Install all dependencies in package.json file in the api directory by running the following command.
```
$ cd api
$ npm install
```

2 - Install all dependencies in package.json file in the web directory by running the following command.
```
$ cd web
$ npm install
```

3- Once installatiohn is complete. Navigate to the root directory (MEAN) and then run the following.  

```
$ npm start
```

this command will run the web and the api together

you can access the angular app at http://localhost:4200

You cane access API at: http://localhost:3000

You can run the web or the api by themselves by navigating to there respective folders and running npm start.

## Contributors

Naji Atallah.

## License

No license.
