import Post from "../models/Post.js";
import mongoose from "mongoose";
import FileServices from "../fileServices/FileServices.js";

class PostService {
    async createPost(post, picture) {
        const fileName = FileServices.saveFile(picture)
        const createdPost = new Post({...post, picture: fileName});
        await createdPost.save()
        return post
    }

    async getAllPosts() {
        const allPosts = await Post.find().lean()
        return allPosts;
    }

    async getPost(id) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Id is incorrect!")
        }
        const post = await Post.findById(id);
        return post;
    }

    async updatePost(post) {
        if (!post._id) {
            throw new Error("Id is incorrect!")
        }

        const updatedPost = await Post.findByIdAndUpdate(
            post._id,
            {author: String, title: String, content: String, picture: String},
            {new: true, runValidators: true}
        );

        return updatedPost;
    }

    async deletePost(id) {
        if (!id) {
            res.status(400).json({message: 'Id is incorrect'});
        }
        const post = await Post.findByIdAndDelete(id)
        return post;
    }
}

export default new PostService();