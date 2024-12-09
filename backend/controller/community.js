const Community = require('../models/Community');
const { getIo } = require('../socket'); // Import the Socket.io singleton

async function handleCreateCommunity(req, res) {
    try {
        const { name, description } = req.body;

        // Validate required fields
        if (!name || !description) {
            return res.status(400).json({ error: 'Name and description are required' });
        }

        // Ensure the user is authenticated
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Create a new community with the current user as the creator
        const community = new Community({
            name,
            description,
            creator: req.user.userId,
        });

        // Save the community to the database
        await community.save();

        // Emit the "communityCreated" event to all connected clients
        const io = getIo(); // Safely access the Socket.io instance
        if (io) {
            io.emit('communityCreated', {
                community,
                creator: req.user.username || 'Unknown',
            });
        }

        // Send success response
        res.status(201).json({ message: 'Community created successfully', community });
    } catch (error) {
        console.error('Error creating community:', error);

        // Send error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleGetCommunity(req, res) {
    try {
        const communities = await Community.find();
        res.status(200).json({ communities });
    } catch (error) {
        console.error('Error fetching communities:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleIndividualCommunity(req, res) {
    try {
        const { communityId } = req.params;

        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ error: 'Community not found' });
        }

        res.status(200).json({ community });
    } catch (error) {
        console.error('Error fetching community:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleDeleteCommunity(req, res) {
    try {
        const { communityId } = req.params;

        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ error: 'Community not found' });
        }

        // Check if the logged-in user is the creator
        if (community.creator.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'You are not authorized to delete this community' });
        }

        await community.remove;

        // Emit the "communityDeleted" event
        const io = getIo();
        io.emit('communityDeleted', {
            communityId,
            deletedBy: req.user.username || 'Unknown',
        });

        res.status(200).json({ message: 'Community deleted successfully' });
    } catch (error) {
        console.error('Error deleting community:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handleCreateCommunity,
    handleGetCommunity,
    handleIndividualCommunity,
    handleDeleteCommunity,
};
