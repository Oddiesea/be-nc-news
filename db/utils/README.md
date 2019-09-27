# Be-NC-News

Be-NC-News is a Back-end node.js app for implementing our NC-News project server. 

## Getting Started

The following inscructions will get you up and running with your own instance of the Be-NC-News API.

### Prerequisites


```
Node.js
NPM
A PSQL Instance 
```

### Installing

To install follow these steps

Set up your PSQL database and update the knexfile.js with the relevant settings

```
connection: {
      database: "database_name",
      username: "username",
      password: "password"
```

Run npm to install dependencies 

```
npm install
```

End with an example of getting some data out of the system or using it for a little demo

------------
## Running the tests

Mocha, chai and supertest are used for testing. Find the test files in the `spec` folder. 

### Util tests

These test our utility functions for seeding the database.

```
npm run util-test
```

### App tests

These test our endpoints and queries.

```
npm test
```

## Deployment

Add additional notes about how to deploy this on a live system


------------

## Built With

* [Node.js](http://nodejs.com) - 
* [Express](http://www.dropwizard.io/1.0.2/docs/) - Web Framework
* [NPM](https://www.npmjs.com) - Dependency Management
* [KNEX](http://knexjs.org) - ORM / SQL Query Builder 
* [node-postgres](https://node-postgres.com/) - Postgres Client

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Liam Wilton-Jones** - *Initial work* - [PurpleBooth](https://github.com/Oddiesea)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Northcoders Team, for their continued support.