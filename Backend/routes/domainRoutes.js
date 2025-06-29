const express=require('express');
const domainController=require("../controllers/domainController");
const router=express.Router();

router.post('/addDomain',domainController.addDomain);
router.post('/seeDomain',domainController.getDomain);


module.exports=router;