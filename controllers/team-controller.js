const { login, soqlQuery, soqlQueryWithChildren } = require("jsforce-patterns");
const { customSort } = require("../util/custom-sort");
const HttpError = require("../http-error");

const getTeams = async (req, res, next) => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  soqlQuery(
    conn,
    "Baseball_Teams__c",
    {
      fields:
        "Id, Name, Established__c, Photo__c, Photo_Color__c, League__c, Conference__c, Division__c, Stadium__c, Stadium_Location__c, Stadium_Address__c, Capacity__c",
      sort: "Name"
    },
    (err, teams) => {
      if (err) {
        return next(
          new HttpError("Cannot retrieve teams, please try again.", 500)
        );
      } else {
        res.json({
          teams: teams.map(team => {
            return {
              id: team.Id,
              name: team.Name,
              url: team.Name.replace(/\s/g, ""),
              established: team.Established__c,
              photo: team.Photo__c,
              photoColor: team.Photo_Color__c,
              league: team.League__c,
              conference: team.Conference__c,
              division: team.Division__c,
              stadium: team.Stadium__c,
              address: team.Stadium_Address__c,
              location: team.Stadium_Location__c,
              capacity: team.Capacity__c
            };
          })
        });
      }
    }
  );
};

const getTeamsWithAffiliates = async (req, res, next) => {
  const conn = await login({
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  });

  soqlQueryWithChildren(
    conn,
    "Baseball_Teams__c",
    {
      fields:
        "Id, Name, Established__c, Photo__c, Photo_Color__c, League__c, Conference__c, Division__c",
      sort: "Name",
      conditions: { League__c: "MLB" }
    },
    "Affiliate__r",
    {
      fields:
        "Id, Name, Established__c, Photo__c, Photo_Color__c, League__c, Conference__c, Division__c",
      sort: "Name"
    },
    (err, teams) => {
      if (err) {
        console.log(err);
        return next(
          new HttpError("Cannot retrieve teams, please try again.", 500)
        );
      } else {
        const results = teams.map(team => {
          return {
            id: team.Id,
            name: team.Name,
            established: team.Established__c,
            photo: team.Photo__c,
            photoColor: team.Photo_Color__c,
            league: team.League__c,
            conference: team.Conference__c,
            division: team.Division__c,
            affiliates: team.Affiliate__r.records.map(affiliate => {
              return {
                id: affiliate.Id,
                name: affiliate.Name,
                established: affiliate.Established__c,
                photo: affiliate.Photo__c,
                photoColor: affiliate.Photo_Color__c,
                league: affiliate.League__c,
                conference: team.Conference__c,
                division: team.Division__c
              };
            })
          };
        });

        const sortOrder = ["MLB", "AAA", "AA", "A+", "A", "SS", "R"];
        results.map(team => {
          customSort({
            data: team.affiliates,
            sortBy: sortOrder,
            sortField: "league"
          });
        });

        res.json({ teams: results });
      }
    }
  );
};

module.exports = {
  getTeams,
  getTeamsWithAffiliates
};
