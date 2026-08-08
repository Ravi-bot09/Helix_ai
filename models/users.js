const mongoose=required('mongoose');
const userschema= new mongoose.schema({
tenatId:{type : string,required : true},
agent_name:{type:string,required:true},
status:{
    type:string,
    enum:['idel','working','done','failed'],
    default:true,
}







})