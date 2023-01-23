const {addTransaction,deleteTransaction,editTransaction, deleteAllTransaction, getAllTransaction} = require('../Controller/transaction');
const express = require('express');

const router = express.Router();

router.route('/').post(addTransaction).delete(deleteTransaction).patch(editTransaction).get(getAllTransaction);
router.delete('/deleteall',deleteAllTransaction)
module.exports = router;