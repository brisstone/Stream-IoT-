var express = require('express');
const detailsModel = require('../models/details');
var router = express.Router();


/* POST details listing. */
router.post('/', async function(req, res) {
  const {
    voltage,
    current,
    temperature,
    batteryVoltage,
    count
  } = req.body;

  // save the data to the model
  const newDetail = new detailsModel({
    voltage,
    current,
    temperature,
    batteryVoltage,
    count
  });
  await newDetail.save()
  res.send({data: newDetail});
});

/* GET all listings */
router.get('/', async function(req, res) {
  const allDetails = await detailsModel.find();
  res.send({data: allDetails});
})


module.exports = router;
