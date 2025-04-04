const mongoose = require('mongoose');
const URL = "mongodb+srv://prashantmalviya13:3KI4xXbtaNFFbVrY@cluster0.arkkni1.mongodb.net/newDashboard"

const connectDb = async()=>{
    try {
        await mongoose.connect(URL)
        console.log("database connection success")

    } catch (error) {
        console.log("database connection failed")
        process.exit(0)
    }
}

module.exports = connectDb;