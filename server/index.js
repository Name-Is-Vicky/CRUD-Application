const exp = require('express')
const app = exp()
const users = require('./dummy.json')
const port = 8000
const fs = require('fs');

const cors = require('cors');
app.use(exp.json())
app.use(cors({
    origin:"http://localhost:5173",
    methods:["POST","GET",'DELETE',"PATCH"]
}))
//Display All Users
app.get('/users',(req,res)=>{
return res.json(users)
})

//Delete users Data
app.delete('/users/:id',(req,res)=>{
    let id = Number(req.params.id)
    let a = users.filter((user)=> user.id !== id)

  fs.writeFile('./dummy.json',JSON.stringify(a),(err,data)=>{
    return res.json(a)
  })
})

//Add New User

app.post("/users",(req,res)=>{
    let {name,age,city} = req.body
    // if(!name || !age || !city){
    //     res.status(400).send({"Message":"All Feilds Required"})
    // }
    let id = Date.now()
    users.push({id,name,age,city})
    fs.writeFile('./dummy.json',JSON.stringify(users),(err,data)=>{
        return res.json({"Message":"user detail Added successfully"})
      })
    
})
//Update User

app.patch("/users/:id",(req,res)=>{
    let id = req.params.id
    let {name,age,city} = req.body
    // if(!name || !age || !city){
    //     res.status(400).send({"Message":"All Feilds Required"})
    // }

    let index = users.findIndex((user)=> user.id == id)

    users.splice(index,1,{...req.body})

    fs.writeFile('./dummy.json',JSON.stringify(users),(err,data)=>{
        return res.json({"Message":"user detail Updated successfully"})
      })
    
})


app.listen(port,(err)=>{
    console.log(`App is Running at ${port}`)
})