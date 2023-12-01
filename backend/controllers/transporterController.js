const Transporter = require('../models/Transporter')
const mongoose = require('mongoose')

//Get all forms
const getTransporters = async(req,res) =>{
    const transporters = await Transporter.find({}).sort({createdAt: -1})

    res.status(200).json(transporters)
}


//Get single form

const getTransporter = async(req,res)=>{
    const{id}= req.params

    const transporter = await Transporter.findById(id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such information'})
    }

    if(!transporter){
        return res.status(404).json({error:'No such information'})
    }
    res.status(200).json(transporter)

}


//create new form
const createTransporter = async(req, res) => {
    const {CompanyName,
        Bidamount} = req.body
        // add to db
    try{
        const transporter = await Transporter.create({   
            CompanyName,
            BidAmount
           })
           res.status(200).json(transporter)
        }
           catch(error){
            res.status(400).json({error: error.message})
           }
    }


//delete a form
const deleteTransporter = async(req, res)=>
{
    const{id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such information'})
    }
    const transporter = await Transporter.findOneAndDelete({_id: id})
    if(!transporter){
        return res.status(404).json({error:'No such information'})
    }
    res.status(200).json(transporter)

}



//update a form
const updateTransporter = async(req, res)=>{
    const{id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such information'})
    }
    const transporter = await Transporter.findOneAndUpdate({_id:id},{...req.body})

    if(!transporter){
        return res.status(404).json({error:'No such information'})
    }
    res.status(200).json(transporter)

}


module.exports = {
    getTransporters,
    getTransporter,
    createTransporter,
    deleteTransporter,
    updateTransporter
}