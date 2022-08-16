const express = require('express')
const mongoose = require('mongoose')
const random = require('random')
const app = express()


const MONGO_PORT = "mongodb+srv://admin-ayush:ayushsinha1301@cluster0.hughs.mongodb.net/random"
mongoose.connect(MONGO_PORT)

// const random_number_generate = random.int((min = 1), (max = 6))
// console.log(random_number_generate)


const personSchema = new mongoose.Schema({
    name: String,
    count: Number
});
const dataSchema = new mongoose.Schema({
    count: Number
})

const Person = mongoose.model("Person",personSchema)
const Data = mongoose.model("Data",dataSchema)

// const newData = new Data({
//     count: 0
// })

// newData.save((err)=>{
//     if(err){
//         console.error(err)
//     }
// })

app.post("/data",(req,res)=>{
    const name = req.body.name;
    Data.find({},async(err,found)=>{
        // console.log(found[0].count)
        const count = found[0].count
    })

    const newPerson = new Person({
        name: name,
        count: count
    })

    newPerson.save((err)=>{
        if(err){
            console.error(err)
        }
    })

    res.send("Submitted")
})

app.get("/data",(req,res)=>{
    const random_number_generate = random.int((min = 1), (max = 3))
    Person.find({count: random_number_generate},async(err,found)=>{
        if(!err){
            console.log(found[0].name)
            res.send(found[0].name)
        }else{
            console.error(err)
            res.send(err)
        }
    })
})



app.listen(3000,()=>{
    console.log(`Server running at PORT  3000`)
})