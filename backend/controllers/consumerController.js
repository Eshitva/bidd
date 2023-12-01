const Consumer = require('../models/Consumer')
const mongoose = require('mongoose')

//Get all forms
const getConsumers = async(req,res) =>{
    const consumers = await Consumer.find({}).sort({createdAt: -1})

    res.status(200).json(consumers)
}


//Get single form

const getConsumer = async(req,res)=>{
    const{id}= req.params

    const consumer = await Consumer.findById(id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such information'})
    }

    if(!consumer){
        return res.status(404).json({error:'No such information'})
    }
    res.status(200).json(consumer)

}


//create new form
const createConsumer = async(req, res) => {
    const {Fullname,   
        emailID,
        phoneno,
        packgedetails,
        noofItems,
        DOD,
        TOD,
        pickupadd,
        pickcity,
        pickstate,
        pickupzipcode,
        deliveryadd,
        deliverycity,
        deliverystate,
        deliveryzipcode} = req.body
        // addd to db
    try{
        const consumer = await Consumer.create({Fullname,   
         emailID,
         phoneno,
         packgedetails,
         noofItems,
         DOD,
         TOD,
         pickupadd,
         pickcity,
         pickstate,
         pickupzipcode,
         deliveryadd,
         deliverycity,
         deliverystate,
         deliveryzipcode
           })
           res.status(200).json(consumer)
        }
           catch(error){
            res.status(400).json({error: error.message})
           }
    }


//delete a form
const deleteConsumer = async(req, res)=>
{
    const{id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such information'})
    }
    const consumer = await Consumer.findOneAndDelete({_id: id})
    if(!consumer){
        return res.status(404).json({error:'No such information'})
    }
    res.status(200).json(consumer)

}



//update a form
const updateConsumer = async(req, res)=>{
    const{id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such information'})
    }
    const consumer = await Consumer.findOneAndUpdate({_id:id},{...req.body})

    if(!consumer){
        return res.status(404).json({error:'No such information'})
    }
    res.status(200).json(consumer)

}

const addbid = async (req, res) => {
    const { customerid, Bids } = req.body;
  
    // Check if the provided customerid is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(customerid)) {
      return res.status(404).json({ error: 'Invalid customer ID' });
    }
  
    try {
      const consumer = await Consumer.findByIdAndUpdate(
        customerid,
        { $push: { Bids: Bids } },
        { new: true }
      );
  
      if (!consumer) {
        return res.status(404).json({ error: 'No such customer found' });
      }
  
      return res.status(200).json(consumer);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
 



module.exports = {
    getConsumers,
    getConsumer,
    createConsumer,
    deleteConsumer,
    updateConsumer,
    addbid
}