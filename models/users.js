const mongoose=required('mongoose');
const userschema= new mongoose.schema({
tenatId:{type : string,required : true},
agent_name:{type:string,required:true},
status:{
    type:string,
    enum:['idel','working','done','failed'],
    default:true,
},
message:{type:string,type:true},},
{timestamps:true})
module.exports=mongoose.model('incident',incidentschema);








