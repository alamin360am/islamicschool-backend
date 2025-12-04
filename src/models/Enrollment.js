import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    transactionId: {
      type: String,
      required: true,
      unique: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'cancelled'],
      default: 'pending'
    },
    amount: {
      type: Number,
      required: true
    },
    originalAmount: {
      type: Number,
      required: true
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    couponUsed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coupon'
    },
    currency: {
      type: String,
      default: 'BDT'
    },
    paymentMethod: {
      type: String,
      default: 'uddoktapay'
    },
    paymentDetails: {
      type: Object,
      default: {}
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    completionStatus: {
      type: String,
      enum: ['in-progress', 'completed'],
      default: 'in-progress'
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completedLectures: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture'
    }]
  },
  { timestamps: true }
);

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export default mongoose.model('Enrollment', enrollmentSchema);