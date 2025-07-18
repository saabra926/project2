import mongoose from "mongoose";

let isConnected = false;

const connection = async () => {
    if (isConnected) {
        console.log(" Using existing MongoDB connection");
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error(" MONGODB_URI is missing in environment variables");
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "myDataSet",
        });

        isConnected = db.connections[0].readyState === 1;
        console.log(" Db connect ho gya");
    } catch (err) {
        console.error(" This is an error:", err.message);
        throw err;
    }
};

export default connection;

