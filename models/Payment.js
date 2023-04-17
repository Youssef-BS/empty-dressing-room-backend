import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema(
  {
    ville : {
      type : String , 
      required : true,
       
    },
    numRue: {
      type: String,
      required: true,
    },
    adresseLigne2: {
      type: String,
      required: true,
    },
    codePoastal: {
      type: Number,
      required: true,
    },
},
{ timestamps: true }
);

export const Payment = mongoose.model("Payment" , PaymentSchema);