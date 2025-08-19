const express = require('express');
const router = express.Router();
const domainController = require('../controllers/domainController');


router.post('/adddomain', domainController.addDomain);
router.get('/getdomains/user/:userId', domainController.getDomains);

module.exports=router;