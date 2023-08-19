const express = require('express');
const router = express.Router();

// importing the task model 
const Task = require('../model/task');

// GET tasks route 

router.get('/', async(req, res) => {
    try{
        const task = await Task.find()
        res.status(200).json(task)
    }catch(err) {
       res.status(500).json({message: err.message})
    }
})

// CREATE task 
router.post('/', async(req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const taskAdded = await task.save();
        res.status(201).json(taskAdded)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
   
})

// GET a specific task 

async function getTaskById(req, res, next){
    let task;
    try {
        task = await Task.findById(req.params.id);
        if(task==null) {
            return res.status(400).json({message:'Task not found'})
        }
       
    }
    catch(err) {
        res.status(400).json({message: err.message})
    }
    res.task = task;
    next();
}

router.get('/:id', getTaskById, (req, res) => {
    res.status(200).json(res.task)
})


// Update a specific task 
router.patch('/:id', getTaskById, async(req, res) => {
    if(req.body.title!=null) {
        res.task.title = req.body.title;
    }
    if(req.body.description!=null) {
        res.task.description = req.body.description;
    }
    try{
        const updateTask = await res.task.save();
        res.status(204).json(updateTask);
    }
    catch(err){
        res.status(304).json({message: err.message})
    }
})


// DELETE a task 
router.delete('/:id', getTaskById, async(req, res) => {
    try{
        await res.task.deleteOne();
        res.status(204).json({message: "Task deleted"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router;