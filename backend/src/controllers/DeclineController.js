const Booking = require('../models/Booking');

module.exports = {
  async store(req, res) {
    const { booking_id } = req.params;

    const booking =  await Booking.findById(booking_id).populate('spot');

    booking.aproved = false;

    await booking.save();

    return res.json(booking);
  }
}