const Hotel = require("../models/hotel");
// create hotel
const createHotel = async (req, res) => {
  try {
    const { name, address, city, away, price, description } = req.body;
    const user = req.user.id;
    let filenameArr = [];
    let filepathArr = [];
    req.files.forEach((item) => {
      filenameArr.push(item.filename);
      filepathArr.push(item.path);
    });
    const newHotel = new Hotel({
      name: name,
      address: address,
      city: city,
      away: away,
      filename: filenameArr,
      filepath: filepathArr,
      price: price,
      description: description,
      owner: user,
    });
    await newHotel.save();
    return res.status(201).json({ hotel: newHotel });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      error: err,
    });
  }
};
// delete hotel
// read hotel
const hotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const findHotel = await Hotel.findById(hotelId);
    return res.status(200).json({ hotel: findHotel });
  } catch (err) {
    return res.status(500).json({ message: "ERROR" });
  }
};
const getHotel = async (req, res) => {
  try {
    const { location } = req.params;
    const findingByLocation = await Hotel.find({
      city: { $regex: new RegExp(location, "i") },
    });
    return res.status(200).json({ hotels: findingByLocation });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// search place

module.exports = {
  createHotel,
  getHotel,
};
