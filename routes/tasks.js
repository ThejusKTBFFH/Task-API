const express = require("express");

const router = express.Router();

const Task = require("../models/task");

router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
    }
);

router.post("/", async (req, res) => {
    const task = new Task({
        title: req.body.title,
        is_completed: req.body.is_completed
    });
    await task.save();
    res.send(task);
});

router.get("/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(404).send("Task not found");
    }else{
        res.send(task);
    }
    
}
);

router.put("/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        is_completed: req.body.is_completed
    });

    if(!task){
        res.status(404).send("Task not found");
    }else{

        res.status(204).json({});

    }
   
}
);

router.delete("/:id", async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.send(task);
}
);

router.post("/",async (req,res)=>{
    try{
        const tasks = req.body.map((task)=> new Task(task));
        const result = await Task.insertMany(tasks);

        res.status(201).json({tasks : result.map((task)=> { {id: task._id}})})
    }catch(err){
        res.status(400).json({message: err.message})
    }
} )

module.exports = router;