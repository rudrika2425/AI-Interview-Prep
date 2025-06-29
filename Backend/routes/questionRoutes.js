const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// 1. Static route (exact match) comes first
router.get('/pinned', questionController.getPinnedQuestions);

// 2. Dynamic routes come after
router.get('/:domainId', questionController.getDomainQuestions);
router.patch('/:domainId/pin/:skillIndex/:questionIndex', questionController.togglePinQuestion);
router.patch('/:domainId/unpin/:skillIndex/:questionIndex', questionController.unpinQuestion);

module.exports = router;