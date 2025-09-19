import mongoose, { Schema } from "mongoose"

export interface IUser extends Document{
    username:string,
    password:string
}

const UserSchema: Schema =new Schema({
    username:{type:String,unique: true,required:true},
    passwrod:{type:String,required:true}
})
export default mongoose.model<IUser>('User',UserSchema)