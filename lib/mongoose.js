import mongoose from "mongoose";

const connection = async () => {

    try {
        await mongoose.connect(process.env.ModelURL);
        console.log("db connect ho gya ha")
    } catch (err) {
        console.log("This is an error",err)
    }
}

export default connection; 