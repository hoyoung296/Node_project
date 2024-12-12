const db = require('../../database/db_common');

const StoryDAO = {
    async insertStory(userId, imagePath) {
        const query = "INSERT INTO stories (user_id, image_path, created_at) VALUES (?, ?, NOW())";
        return db.execute(query, [userId, imagePath]);
    },

    async fetchAllStories() {
        const query = "SELECT * FROM stories WHERE TIMESTAMPDIFF(HOUR, created_at, NOW()) <= 24";
        return db.query(query);
    }
};

module.exports = StoryDAO;
