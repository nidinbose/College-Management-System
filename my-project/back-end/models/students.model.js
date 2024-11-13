import mongoose from "mongoose";

const studentsSchema = new mongoose.Schema({
  name: { type: String},
  studentid: { type: String},
  class: { type: String},
  department: { type: String },
  semester: { type: String},
  bloodType: { type: String },
  dateOfBirth: { type: String },
  photo: { type: String },

    semesters: [
    {
      semester: { type: String}, 
      subjects: [
        {
          subjectName: { type: String},  
          score: { type: Number}    
        }
      ]
    }
  ]
});

export default mongoose.models.student || mongoose.model('student', studentsSchema);
