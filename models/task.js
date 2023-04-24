const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    is_completed:{
        type:Boolean,
        default:false
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;