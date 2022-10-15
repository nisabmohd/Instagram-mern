const mongoose=require('mongoose')
exports.connectToDB = async () => {
    mongoose.connect(process.env.Mongo_URI).then((connection)=>{
        console.log("DB connected : "+ connection.connection.host);
    }).catch(err=>{
        console.log(err);
    })
};
