const { default: mongoose } = require("mongoose");
const Transaction = require("../model/transaction");

const getAllTransaction = async (req,res)=>{
  const userId = req.user.userId
  try{
    const transactionList = await Transaction.find({createdBy:userId});
    res.status(200).json({transactionList})
  }
  catch(e){
    res.status(400).json({msg:'something went wrong !'})
  }
}

const addTransaction = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const transaction = await Transaction.create(req.body);
    res.status(201).json({ msg: "transaction is added.", transaction });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "Something went wrong !" });
  }
};

const deleteTransaction = async (req, res) => {
  const transactionId = mongoose.Types.ObjectId(req.query);
  try {
   const transaction = await Transaction.findByIdAndDelete(transactionId);
    res.status(200).json({ msg: "Deleted Successfully.",transaction });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "Something went wrong !" });
  }
};

const editTransaction = async (req, res) => {
  const transactionId = mongoose.Types.ObjectId(req.query);
  try {
   const transaction = await Transaction.findByIdAndUpdate(transactionId, req.body,{new:true});
   if(!transaction){
     return res.status(400).json({msg:'No such transaction !'})
   }
    res.status(202).json({ msg: "Transaction update successful",transaction });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "Something went wrong !" });
  }
};

const deleteAllTransaction = async (req, res) => {
  const userId = req.user.userId;
  try{
    await Transaction.deleteMany({createdBy:userId});
    res.status(202).json({ msg: "All transaction deleted" });
  }
  catch(e){
    console.log(e);
    res.status(400).json({ msg: "Something went wrong !" });
  }
  

};

module.exports = {
  addTransaction,
  deleteTransaction,
  editTransaction,
  deleteAllTransaction,
  getAllTransaction
};
