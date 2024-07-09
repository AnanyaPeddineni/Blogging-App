const express = require('express');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const { createPost, updatePost, searchPosts, getAllPosts, getPostById, deletePost } = require('../controllers/postController');

const router = express.Router();

router.post('/post', uploadMiddleware.single('file'), createPost);
router.put('/post', uploadMiddleware.single('file'), updatePost);
router.get('/post/search', searchPosts);
router.get('/post', getAllPosts);
router.get('/post/:id', getPostById);
router.delete('/post/:id', deletePost);

module.exports = router;
