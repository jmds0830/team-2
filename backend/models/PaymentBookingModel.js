import mongoose from "mongoose";

const paymentBookingSchema = new mongoose.Schema({
  queueId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  studentId: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const PaymentBooking = mongoose.model('PaymentBooking', paymentBookingSchema);

export default PaymentBooking;
