import { Router } from "express";
import { addTransaction, deleteTransaction, editTransaction, getAllTransactions } from "../controllers/transaction.controller.js";


const router = Router()

router.route("/add-transaction").post(addTransaction)
router.route("/get-all-transactions").post(getAllTransactions)
router.route("/edit-transaction").post(editTransaction);
router.route("/delete-transaction").post(deleteTransaction);


export default router;