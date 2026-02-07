import mongoose from "mongoose";
const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB");
        })
        let mongodbURI = process.env.MONGODB_URL;
        const projectName = 'resume-builder';
        if (!mongodbURI) {
            throw new Error("MONGODB_URL environment variable not set")
        }
        if (mongodbURI.endsWith('/')) {
            mongodbURI = mongodbURI.slice(0, -1)
        }
        await mongoose.connect(`${mongodbURI}/${projectName}`)
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;