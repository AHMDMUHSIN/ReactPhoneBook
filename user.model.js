import mongoose from "mongoose";
const schema=new mongoose.Schema({
    name:{type:String},
    number:{type:String}
})

export default mongoose.model.persons||mongoose.model("person",schema)