import mongoose from "mongoose";

const DBConnection=async()=>{
    try {
        const connnection = await mongoose.connect(process.env.MONGO_URL)

        console.log(`Mongo connected !!! ${connnection.connection.host}`)

    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}


export default DBConnection;