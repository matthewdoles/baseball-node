const { login, soqlQuery } = require('jsforce-patterns');
const HttpError = require('../http-error');

const getTeams = async (req, res, next) => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  soqlQuery(
    conn,
    'Contact',
    {
      conditions: {
        Name: { $like: 'A%' }
      },
      fields: 'Name, Phone'
    },
    (err, teams) => {
      if (err) {
        return next(
          new HttpError('Cannot retrieve teams, please try again.', 500)
        );
      } else {
        res.json({
          teams: teams.map(team => {
            return {
              Name: team.Name,
              Phone: team.Phone
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
