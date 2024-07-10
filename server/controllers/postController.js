const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = 'asdfe45we45w345wegw345werjktjwertkj';

const createPost = (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
};

const updatePost = (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });
};

const searchPosts = async (req, res) => {
  const { title } = req.query;
  try {
    const posts = await Post.find({ title: new RegExp(title, 'i') }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllPosts = async (req, res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20)
  );
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
};

const deletePost = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { id } = req.params;
    const postDoc = await Post.findById(id);
    if (!postDoc) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await postDoc.remove();
    res.json({ message: 'Post deleted successfully' });
  });
};

module.exports = {
  createPost,
  updatePost,
  searchPosts,
  getAllPosts,
  getPostById,
  deletePost,
};
