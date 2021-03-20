const IndexControll = require("./indexcontroller")
const config = require('../db');
const fs = require('fs')
const {User} = require("../models/Users")
const {BankAccount} = require("../models/BankAccount")

exports.bankAccountChange = async (req, res, next) => {
    var bankAccount = await BankAccount.findOne();
    if(bankAccount)
    {  var filter = {_id: bankAccount._id};
        const updatePerson = {
            address : req.body.address,
        }
        var bankAccount = await IndexControll.BfindOneAndUpdate( BankAccount , filter , updatePerson);
        return res.send({status : true,data : bankAccount});
    }
    else
    {
        let newBank = new BankAccount({
            address:req.body.address,
        });
        var save = await newBank.save();
        return res.send({status : true , data : save});
    }
}
exports.getBankAccount = async (req,res,next) =>{
    // console.log( req.user,"--------------")
    var bankAccount = await BankAccount.findOne()
    if(!bankAccount)
    {
        return res.send({status: false , error:"Bank account doesn't exsit"})
    }
    return res.send({status : "get_success" , data : bankAccount});
}