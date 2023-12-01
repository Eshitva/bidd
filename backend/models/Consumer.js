const mongoose = require('mongoose')

const Schema = mongoose.Schema

const consumerSchema = new Schema({
 Fullname: {
    type: String,
    reqiured: true
 },   
 emailID: {
    type: String,
    reqiured: true
 },
 phoneno: {
    type: Number,
    required: true
 },
 packgedetails:{
    type: String,
    required: true
 },
 noofItems:{
    type: Number,
    required: true
 },
 DOD: {
    type: String,
    required: true
 },
 TOD: {
    type:Number,
    required: true
 },
 pickupadd: {
    type: String,
    required: true
 },
 pickcity:{
    type: String,
    required: true
 },
 pickstate:{
    type: String,
    required: true
 },
 pickupzipcode:{
    type: String,
    required: true
 },
 deliveryadd: {
    type: String,
    required: true
 },
 deliverycity: {
    type: String,
    required: true
 },
 deliverystate: {
    type: String,
    required: true
 },
 deliveryzipcode: {
    type: String,
    required: true
 },
 Bids:{
   type: Array,
   required: false
 }
 

}, {timestamps: true})

module.exports = mongoose.model('Consumer',consumerSchema)