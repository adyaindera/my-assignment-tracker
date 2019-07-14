const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  course: String,
  deadline: Date
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;