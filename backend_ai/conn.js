//mongodb+srv://bts205060_db_user:DZEOZWIhzzHxj63U@cluster0.lkgiyak.mongodb.net/?appName=Cluster0
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://bts205060_db_user:DZEOZWIhzzHxj63U@cluster0.lkgiyak.mongodb.net/?appName=Cluster0').then((res) => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
})