import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema({
  semester: { type: Number },
  subjects: [
    {
      name: { type: String },  // Subject name
      mark: { type: Number },  // Mark for the subject
    },
  ],
  studentid: { type: String },
});

export default mongoose.models.Mark || mongoose.model('Mark', marksSchema);

  