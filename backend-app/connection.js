const mongoose = require('mongoose');
const URI = "mongodb+srv://oula:oulatestpass0@firstcluster.woitwky.mongodb.net/todo-app";

async function main(){
    mongoose.connect(URI);
}

main().then(()=>console.log("DB connected!")).catch((err)=>{console.log(err)});

module.exports = main();