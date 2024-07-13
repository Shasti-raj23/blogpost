
import mongoose from "mongoose";
import { type } from 'os';

const productSchema= mongoose.Schema({
    id:{
        type:Number,
        required:[true,"please enter the product name"]
    },
    title:{
        type: String,
        required:true,
        default:0
    },
    content:{
        type:String,
        required:true,
        default:0
    },
    authour:{
        type:String,
        required:true,
        default:0
    },
    date:{
        type:String,
        required:true,
        default:0
    }

})

const product = mongoose.model("product",productSchema);
export default product 