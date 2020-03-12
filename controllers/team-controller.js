const { login, soqlQuery } = require('jsforce-patterns');
const HttpError = require('../http-error');

const getTeams = async (req, res, next) => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  soqlQuery(
    conn,
    'Baseball_Teams__c',
    {
      fields: 'Id, Name, Established__c, Photo__c, Photo_Color__c',
      sort: 'Name'
    },
    (err, teams) => {
      console.log(teams);
      if (err) {
        return next(
          new HttpError('Cannot retrieve teams, please try again.', 500)
        );
      } else {
        res.json({
          teams: teams.map(team => {
            return {
              id: team.Id,
              name: team.Name,
              established: team.Established__c,
              photo: team.Photo__c,
              photoColor: team.Photo_Color__c
            };
          })
        });
      }
    }
  );
};

module.exports = {
  getTeams
};
