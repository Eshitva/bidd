const express = require('express')


const{
    getTransporters,
    getTransporter,
    createTransporter,
    deleteTransporter,
    updateTransporter
} = require('../controllers/transporterController')

const routers = express.Router()
//get all Transporter bid
routers.get('/',getTransporters )


//Gets single Transporter bid

routers.get('/:id', getTransporter)

//Create a new Transporter bid

routers.post('/', createTransporter)

//delete a bid

routers.delete('/:id', deleteTransporter)

//update a bid
routers.patch('/:id', updateTransporter)

module.exports = routers