import { Transaction } from "../models/transaction.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import moment from "moment";


const getAllTransactions = asyncHandler(async (req, res) => {

    const {frequency,selectedDate,type} = req.body
    const transactions = await Transaction.find({
        ...(frequency !=='custom' ? {
            date:{
                $gt:moment().subtract(Number(frequency), "d").toDate(),
            },
        } : {
            date:{
                $gte:selectedDate[0],
                $lte:selectedDate[1],
            },
        }),
        userId: req.body.userId,
        ...(type !== 'all' && {type}),
    });
    if (!transactions) {
        throw new ApiError(404, "No transactions found");
    }
    res.status(200).json(
        new ApiResponse(
            200,
            { transactions: transactions },
            "Transactions retrieved successfully"
        )
    )
});

const addTransaction = asyncHandler(async (req, res) => {
    const {userId, amount, category, reference, description, date, type } = req.body;
    const transaction = await Transaction.create({
        userId,
        amount,
        category,
        reference,
        description,
        date,
        type,
    });
    await transaction.save();
    if (!transaction) {
        throw new ApiError(400, "Unable to add transaction");
    }
    res.status(201).json(
        new ApiResponse(
            201,
            {transaction: transaction},
            "Transaction added successfully"
        )
    )
});

const editTransaction = asyncHandler(async (req, res) => {
    const response=await Transaction.findOneAndUpdate({_id: req.body.transactionId}, req.body.payload);
    if (!response) {
        throw new ApiError(400, "Unable to edit transaction");
    }
    res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Transaction edited successfully"
        )
    )

})

const deleteTransaction = asyncHandler(async (req, res) => {
    const response = await Transaction.findOneAndDelete({_id: req.body.transactionId});
    if (!response) {
        throw new ApiError(400, "Unable to delete transaction");
    }
    res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Transaction deleted successfully"
        )
    )
})

export{
    getAllTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
}