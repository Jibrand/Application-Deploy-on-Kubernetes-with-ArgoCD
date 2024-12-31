import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    fullname:{
        type : String,
    },
    email:{
        type : String,
    }
})

const contactData = mongoose.model("contact",contactSchema);
export default contactData