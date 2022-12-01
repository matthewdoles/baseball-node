# baseball-node

[![Build Status](https://travis-ci.com/matthewdoles/baseball-node.svg?branch=main)](https://travis-ci.com/matthewdoles/baseball-node) [![Coverage Status](https://coveralls.io/repos/github/matthewdoles/baseball-node/badge.svg?branch=main)](https://coveralls.io/github/matthewdoles/baseball-node?branch=main)

### Description

There are 30 teams in Major League Baseball, each one of those teams can have on average around 5 affilaite teams which they use to develop upcoming players. From high to low, these affilaite teams play in leagues such as Triple A (AAA), Double A (AA), High A (A+), Single A (A), Short-Season A (SS), and Rookie (R). This backend serves up such information in an API which is utilized by another frontend project of mine: [baseball-react](https://github.com/matthewdoles/baseball-react).

### Design

#### Endpoints

- All Teams: [baseball-node.onrender.com/teams](https://baseball-node.onrender.com/teams)
- MLB Teams w/ Affiliates: [baseball-node.onrender.com/teams/affiliates](https://baseball-node.onrender.com/teams/affiliates)

#### Database

The data is pulled from a table (Baseball_Teams\_\_c) on a personal Developer Edition of [Salesforce](https://www.salesforce.com/). Callouts are made to the Salesforce instance using a npm package called [jsforce-patterns](https://github.com/matthewdoles/jsforce-patterns) (personally developed), which is a helper extension for [JSForce](https://jsforce.github.io/start/).

##### Baseball_Teams\_\_c

| Field                 | Data Type             | Description                                      |
| --------------------- | --------------------- | ------------------------------------------------ |
| Affiliate\_\_c        | Lookup(Baseball Team) | Used to relate affiliate teams to their MLB team |
| Capacity\_\_c         | Number(18, 0)         | Stadium capacity                                 |
| Conference\_\_c       | Text(255)             | Team's league conference name                    |
| Division\_\_c         | Text(255)             | Team's league division name                      |
| Established\_\_c      | Number(4, 0)          | Year team was established.                       |
| League\_\_c           | Text(255)             | Team's league name                               |
| Photo\_\_c            | Text(255)             | File path reference to team's photo              |
| Photo_Color\_\_c      | Text(255)             | Team's primary color.                            |
| Stadium\_\_c          | Text(255)             | Team's stadium name                              |
| Stadium_Address\_\_c  | Text(255)             | Team's stadium address                           |
| Stadium_Location\_\_c | Geolocation           | Team's stadium latitude and longitude            |

#### Routes

##### /teams/

The default route ('/teams/') for the teams endpoint will call the getTeams method on the [team-controller.js](./controllers/team-controller.js) controller. The method will start by making a valid connection with the Salesforce instance where the data is stored. Once connected, the soqlQuery method is used to query all Baseball_Teams\_\_c records and order them alphabetically. In addition to returning the fields outlined in the database section for the JSON response, the method will also use the team name to create a valid url free of spaces, commas, slashes, etc. for the frontend to use for routing.

##### /teams/affiliates

The affiliates route ('/teams/affiliates') for the teams endpoint will call the getTeamsWithAffiliates method on the [team-controller.js](./controllers/team-controller.js) controller. The method will start by making a valid connection with the Salesforce instance where the data is stored. Once connected, the soqlQueryWithChildren method is used to query all Baseball_Teams\_\_c records where the team's league is MLB, and then use the Affiliate\_\_c lookup to also query their affiliate teams. With that data, the method will format the JSON response similiarly to the way it does in the /teams/ route, but now each MLB team will include an array of their affiliate teams stored in a field similarly called affiliates. Each affiliate array item will contain all the same field information as outlined in the database section.

#### Testing & CI

The app is tested using the [Jest](https://jestjs.io/) testing framework in conjuntion with the [SuperTest](https://www.npmjs.com/package/supertest) package used for testing HTTP callouts. Tests can be found in the [test](./tests) folder.

A simple [.travis.yml](.travis.yml) has also been setup to verify a valid build, execute any tests found, and then send the test coverage to [Coveralls](https://coveralls.io/github/matthewdoles/baseball-node?branch=main).
