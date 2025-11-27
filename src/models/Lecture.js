import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    resources: [
      {
        title: String,
        fileUrl: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Lecture', lectureSchema);
