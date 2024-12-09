const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        minlength: [5, 'Description must be at least 10 characters long'],  // Validating description length
        maxlength: [500, 'Description cannot be longer than 500 characters'],
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // Reference to the User model
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Indexing for performance
communitySchema.index({ creator: 1 });
communitySchema.index({ members: 1 });

// Middleware to clean up memberships when a community is removed
communitySchema.post('remove', async function () {
    await User.updateMany(
        { _id: { $in: this.members } },
        { $pull: { memberships: this._id } }
    );
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
