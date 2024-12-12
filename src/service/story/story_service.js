const StoryDAO = require('../../database/story/story_dao');

const StoryService = {
    async addStory(userId, imagePath) {
        return StoryDAO.insertStory(userId, imagePath);
    },

    async getAllStories() {
        return StoryDAO.fetchAllStories();
    }
};

module.exports = StoryService; 
