const mongoose = require("mongoose");
const uri = "mongodb+srv://danielidowu:danielidowu@cluster0.lxulz2t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



function main() {
    mongoose.connect(uri).then(() => {
        console.log("Connection Successful!")

    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };