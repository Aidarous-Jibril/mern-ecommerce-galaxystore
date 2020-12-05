import mongoose from "mongoose";

// Mongoose Connect
 const  connectDB = async () =>  {
    try {
        
        const conn = await mongoose.connect(process.env.MONGO_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        })
         console.log(`MongoDB Connected successfully, ${conn.connection.host}`.cyan.underline )
         
    } catch (error) {
        console.log(`Mongo DB conn err ${error}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB