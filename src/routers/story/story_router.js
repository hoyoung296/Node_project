const express = require('express');
const path = require('path');
const router = express.Router();

// story.js 파일 직접 제공
router.get('/public/js/story/story.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/js/story/story.js'));
});

module.exports = router;
