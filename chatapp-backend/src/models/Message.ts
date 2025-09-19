import mongoose, { Schema } from "mongoose"

export interface IMessage extends Document{
    sender:string,
    content:string,
    room:string,
    createAt:Date
}
const MessageSchema: Schema=new Schema({
    sender:{type:String,required:true},
    content:{type:String,required:true},
    room:{type:String,required:true},
},{timestamps:true})
export default mongoose.model<IMessage>('Message',MessageSchema);