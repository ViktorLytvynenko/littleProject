import express from 'express';
import mongoose from 'mongoose';
import {DB_URL} from "./config/config.js";
import post from './routes/post.js';
import fileUpload from 'express-fileupload';
import cors from 'cors'
import corsOptions from "./config/corsOptions.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({}))
app.use(express.static('static'))

app.use("/api/v1", post)

const application = async () => {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => {
            console.log(`Server was started on PORT ${PORT}`);
            console.log("localhost:5000/api/v1/posts")
        })
    } catch (e) {
        console.log(e)
    }
}

application()

