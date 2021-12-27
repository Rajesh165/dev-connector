const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

const connectDB = async ()=>{
    try {
        await mongoose.connect(db);
        console.log('connected to database sucessfuly');
    } catch (err) {
        console.log('server error connection failed! with error: '+err.message);
        process.exit(1);
    }
}

module.exports = connectDB