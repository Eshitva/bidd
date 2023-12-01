const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transporterSchema = new Schema({
 CompanyName:{
    type: String,
    required: true

 },
 BidAmount:{
    type: Number,
    required: true
 }
}, {timestamps: true})

module.exports = mongoose.model('Transporter',transporterSchema)