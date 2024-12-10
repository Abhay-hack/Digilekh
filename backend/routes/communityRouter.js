const express = require('express');
const Community = require('../models/Community');
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
    handleCreateCommunity,
    handleGetCommunity,
    handleIndividualCommunity,
    handleDeleteCommunity
} = require('../controller/community');
const io = require('../index').io;  // Import the io instance to emit events

// Create a new community
router.post('/create', authenticate, handleCreateCommunity);

// Get all communities
router.get('/community', authenticate, handleGetCommunity);

// Get details of a specific community
router.get('/:communityId', handleIndividualCommunity);

// Delete a community
router.delete('/:communityId', authenticate, handleDeleteCommunity);

module.exports = router;
