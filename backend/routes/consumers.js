const express = require('express')
const{
    createConsumer,
    getConsumer,
    getConsumers,
    deleteConsumer,
    updateConsumer,
    addbid
} = require('../controllers/consumerController')

const router = express.Router()

//GET ALL CONSUMER FORMS
router.get('/', getConsumers)

//GET A SINGLE CONSUMER FORM
router.get('/:id', getConsumer)

//CREATE A NEW CONSUMER FORM
router.post('/', createConsumer)
  
//DELETE A CONSUMER FORM
router.delete('/:id',deleteConsumer)
  
//UPDATE A CONSUMER FORM
router.patch('/:id',updateConsumer) 

router.patch('/Bid/:id',addbid)



module.exports = router