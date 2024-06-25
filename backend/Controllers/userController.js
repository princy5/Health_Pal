import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js"

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updateUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to Update",
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No user Found",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const Users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Users Found",
      data: Users,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};


export const getUserProfiler = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { password, ...rest } = user._doc;

    res
      .status(200)
      .json({
        success: true,
        message: "Profile info is getting",
        data: { ...rest },
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong,cannot get" });
  }
};


export const getMyAppointments = async (req, res) => {
  try {
    //retrieve appointments
    const bookings = await Booking.find({ user: req.userId });
        //extract doc ids from book
    const doctorIds = bookings.map((el) => el.doctor.id);
//retrieve doctor from doctor ids
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Appointment are getting",
        data: doctors,
      });

   

  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong,cannot get" });
  }
};