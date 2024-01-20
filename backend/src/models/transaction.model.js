import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    reference:{
        type: String,
    },
    description:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },

},{timestamps: true})


const Transaction = mongoose.model('Transaction', transactionSchema);

export { Transaction}