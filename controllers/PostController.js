import PostService from "../services/PostService.js";
import PostMapper from "../mappers/PostMapper.js";

class PostController {

    //метод с дто
    async createPost(req, res) {
        try {
            const requestDTO = req.body;
            const entity = PostMapper.RequestDtoToEntity(requestDTO);
            const newPost = await PostService.createPost(entity, req.files.picture);
            const responseDTO = PostMapper.EntityToResponseDTO(newPost);
            res.status(201).json(responseDTO);
        } catch (e) {
            console.error(e);
            res.status(500).json(e);
        }
    }

    async getAllPosts(req, res) {
        try {
            const allPosts = await PostService.getAllPosts()
            const responseAllPosts = allPosts.map(post =>
                PostMapper.EntityToResponseDTO(post)
            )
            res.status(200).json(responseAllPosts);
        } catch (e) {
            console.error(e);
            res.status(500).json(e);
        }
    }

    async getPost(req, res) {
        try {
            const post = await PostService.getPost(req.params.id)
            const responseDTO = PostMapper.EntityToResponseDTO(post);
            res.status(200).json(responseDTO);
        } catch (e) {
            console.error(e);
            res.status(500).json(e.message);
        }
    }

    async updatePost(req, res) {
        try {
            const requestDTO = req.body;
            const entity = PostMapper.RequestDtoToEntity(requestDTO);
            const updatedPost = await PostService.updatePost(entity)
            const responseDTO = PostMapper.EntityToResponseDTO(updatedPost);
            res.status(200).json(responseDTO);
        } catch (e) {
            console.error(e);
            res.status(500).json(e.message);
        }
    }

    async deletePost(req, res) {
        try {
            const candidate = await PostService.getPost(req.params.id)
            if (!candidate) {
                res.status(404).json({message: 'Post not found'});
            } else {
                await PostService.deletePost(req.params.id)
                res.status(200).json({message: "Post was deleted successfully"});
            }
        } catch (e) {
            console.error(e);
            res.status(500).json(e.message);
        }
    }

}

export default new PostController();