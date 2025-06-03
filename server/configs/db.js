/*config to connect to database */

import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log
        ("Databse Connected")
        );
        await mongoose.connect(`${process.env.MONGODB_URI}/JhatpatGrocery`)
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;