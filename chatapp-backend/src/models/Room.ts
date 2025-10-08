import { timeStamp } from "console"
import mongoose, { Schema } from "mongoose"

export interface IRoom extends Document{
    name:string,
    createAt:Date
}
const RoomSchema=new Schema({
    name:{type:String,required:true,unique:true},
},{timestamps:true});
export default mongoose.models<IRoom>("Room",RoomSchema) || mongoose.model<IRoom>("Room",RoomSchema);
