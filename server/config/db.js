const mongoose=require("mongoose")

async function mongodb(){

    // try{
    //     await  mongoose.connect("mongodb://127.0.0.1:27017/e-learning")
    //     console.log("mongodb connected succesfully")
    // }catch(e){
    //     console.log(e)
    // }
    try{
        await mongoose.connect("mongodb://sathishchandrasekar:sathishchandrasekar@ac-acff66f-shard-00-00.fdset1a.mongodb.net:27017,ac-acff66f-shard-00-01.fdset1a.mongodb.net:27017,ac-acff66f-shard-00-02.fdset1a.mongodb.net:27017/?ssl=true&replicaSet=atlas-49p7pw-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0/e-learning")
        console.log("mangodb connected succesfully")
        }catch(e){
         console.log(e)
        } 
                                  // mongodb://sathishchandrasekar:@ac-acff66f-shard-00-00.fdset1a.mongodb.net:27017,ac-acff66f-shard-00-01.fdset1a.mongodb.net:27017,ac-acff66f-shard-00-02.fdset1a.mongodb.net:27017/?ssl=true&replicaSet=atlas-49p7pw-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
}

module.exports=mongodb
