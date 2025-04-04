const mongoose = require('mongoose');
const URL = "mongodb://localhost:27017/newDashboard"

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