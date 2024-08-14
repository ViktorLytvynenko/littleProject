import mongoose from "mongoose";
import AutoIncrement from 'mongoose-sequence';

const postSchema = new mongoose.Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    picture: {type: String, required: false},
    dataCreated: {type: Date, default: Date.now()},
    dataUpdated: {type: Date, default: Date.now()}
});

// postSchema.plugin(AutoIncrement(mongoose), {inc_field: 'id'});

const Post = mongoose.model('Post', postSchema);
export default Post;