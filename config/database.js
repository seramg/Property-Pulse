import mongoose from 'mongoose';

let connected = false

const connectDB = async () => {
    mongoose.set('strictQuery', true)

    //if the db is already connected, dont connect again
    if (connected) {
        console.log('Mongodb is already connected');
        return
    }

    //connect to mongodb
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true;
        console.log('MongoDB connected ....');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;