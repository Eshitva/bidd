require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const consumerRoutes = require('./routes/consumers')
const TransporterRoutes = require('./routes/transporter')
const Consumer = require('./models/Consumer')

//express app
const app = express()

//middleware
app.use(express.json())
 
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/consumers',consumerRoutes)
app.use('/api/transporter',TransporterRoutes)
app.get('/api/minimum-bid/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
  
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(404).json({ error: 'Invalid customer ID' });
    }
  
    try {
      const minimumBid = await getMinimumBidAmount(customerId);
      if (minimumBid === null) {
        return res.status(200).json({ message: 'No bids for this customer' });
      }
      return res.status(200).json({ minimumBid });
    } catch (error) {
      return res.status(500).json({ error: 'Error while fetching minimum bid amount' });
    }
  });
  const getMinimumBidAmount = async (customerId) => {
    try {
      const consumer = await Consumer.findById(customerId);
      if (!consumer) {
        throw new Error('No such customer found');
      }
  
      const bidsArray = consumer.Bids || [];
      if (bidsArray.length === 0) {
        return null; // Return null if there are no bids
      }
  
      // Merge the nested arrays of bids into a single array
      const bids = bidsArray.flat();
  
      // Filter out bids without 'bidAmount' property (sanity check)
      const validBids = bids.filter((bid) => typeof bid.bidAmount === 'number');
  
      if (validBids.length === 0) {
        return null; // Return null if there are no valid bids with 'bidAmount'
      }
  
      // Find the minimum bid amount from the valid bids array
      const minimumBidAmount = validBids.reduce((min, bid) => {
        return bid.bidAmount < min ? bid.bidAmount : min;
      }, validBids[0].bidAmount);
  
      return minimumBidAmount;
    } catch (error) {
      throw new Error('Error while fetching minimum bid amount');
    }
  };
  
  
// connect to db
mongoose.connect(process.env.MONGO_URI)

.then(()=> {
    //listen for requests
app.listen(process.env.PORT, () =>{
    console.log('Connected to db &&listening on port',process.env.PORT)
})
})
.catch((error)=>{
    console.log(error)
})

