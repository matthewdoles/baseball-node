const express = require('express');

const teamsController = require('../controllers/team-controller');

const router = express.Router();

router.get('/', teamsController.getTeams);

router.get('/affiliates', teamsController.getTeamsWithAffiliates);

module.exports = router;
