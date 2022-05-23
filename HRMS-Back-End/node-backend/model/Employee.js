const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Employee = new Schema({
  EmployeeID:{
    type: String
  },
  FirstName: {
    type: String
  },
  LastName: {
    type: String
  },
  Designation: {
    type: String
  },
  Salary: {
    type: String
  }
}, {
  collection: 'employees'
})
module.exports = mongoose.model('Employee', Employee)