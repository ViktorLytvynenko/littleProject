import Router from "express";
import PostController from "../controllers/PostController.js";

const router = new Router()

router.post('/posts', PostController.createPost);
router.get('/posts', PostController.getAllPosts);
router.get('/post/:id', PostController.getPost);
router.put('/post/:id', PostController.updatePost);
router.delete('/post/:id', PostController.deletePost);

export default router;