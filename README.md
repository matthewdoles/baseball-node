# baseball-node

[![Build Status](https://travis-ci.com/matthewdoles/baseball-node.svg?branch=master)](https://travis-ci.com/matthewdoles/baseball-node) [![Coverage Status](https://coveralls.io/repos/github/matthewdoles/baseball-node/badge.svg?branch=master)](https://coveralls.io/github/matthewdoles/baseball-node?branch=master)

### Description

There are 30 teams in Major League Baseball, each one of those teams can have on average around 5 affilaite teams which they use to develop upcoming players. From high to low, these affilaite teams play in leagues such as Triple A (AAA), Double A (AA), High A (A+), Single A (A), Short-Season A (SS), and Rookie (R). This backend serves up such information in an API which is utilized by another frontend project of mine: [baseball-react](https://github.com/matthewdoles/baseball-react).

### Design

#### Endpoints

- All Teams: [baseball-affiliates.herokuapp.com/teams/](https://baseball-affiliates.herokuapp.com/teams/)
- MLB Teams w/ Affiliates: [baseball-affiliates.herokuapp.com/teams/affiliates](https://baseball-affiliates.herokuapp.com/teams/affiliates)

#### Deployment

This backend API is hosted on [Heroku](https://www.heroku.com/), and connected directly to this repository. Development is done on a develop branch, and then a deployment is kicked off on push to master.

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

##### /teams/affiliates
