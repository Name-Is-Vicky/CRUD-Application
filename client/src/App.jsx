import { useState,useEffect } from 'react'
import axios from 'axios'
import './App.css'
<link href="https://fonts.googleapis.com/css?family=Inter:100,200,300,regular,500,600,700,800,900" rel="stylesheet" />
function App() {  
  const [users,setUsers] = useState([])
  const [filterdata,setFilterdata] = useState([])
  const [model,setModel] = useState(false)
  const [userData,setUserData]= useState({name:" ",age:" ",city:" "})

  const getAllUsers = async () => {
    await axios.get("http://localhost:8000/users").then((res)=>{
      setUsers(res.data)
      setFilterdata(res.data)
    })
  }
  useEffect(()=>{
    getAllUsers()
  },[])

  //search event
  const handleSearchChange = (e) =>{
   const searchData = e.target.value.toLowerCase()
   const filteringData = users.filter((user)=>
    user.name.toLowerCase().includes(searchData) || user.city.toLowerCase().includes(searchData))
   setFilterdata(filteringData)
  }

  //Delete Event
  const handleDelete = async (id) =>{
   
    const msg = window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS USER.?")
    if(msg){
      await axios.delete(`http://localhost:8000/users/${id}`).then((res)=>{
        setUsers(res.data)
        setFilterdata(res.data)
      })
    }
  }
 //add user data
 const addRecord = () =>{
  setUserData({name:"",age:"",city:""})
  setModel(true)
 }

 const close = () =>{
  getAllUsers()
  setModel(false)
 }

 const handleData = (e) =>{
  setUserData({...userData,[e.target.name]:e.target.value})
 }


 const handleSubmit = async(e) =>{
  e.preventDefault() 
  if(userData.name.length>0 && userData.age.length>0 && userData.city.length>0){
    if(userData.id){
      await axios.patch(`http://localhost:8000/users/${userData.id}`,userData).then((res)=>{
        console.log(res)
      })
    }
    else{
    await axios.post("http://localhost:8000/users",userData).then((res)=>{
      console.log(res)
    })
  }
}
else{
  confirm("enter all feild")
}
close();
setUserData({name:"",age:"",city:""})

 }
 //edit record

 const editRecord =(user)=>{
setUserData(user)
setModel(true)
 }
  return (
    <>
    <div className='container'>
      <h3>CRUD Application with React.js FrontEnd And Node.js BackEnd</h3>
      <div className="input-search">
        <input type="search" placeholder='Search Text Here' onChange={handleSearchChange} />
        <button className='btn green' onClick={()=>addRecord()}>Add Record</button>
      </div>
      <table className='tabel'>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filterdata && filterdata.map((user , index)=>{
            return (
              <tr key={user.id}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.city}</td>
                <td><button className='btn green' onClick={()=>editRecord(user)}>Edit</button></td>
                <td><button onClick={()=>handleDelete(user.id)} className='btn red'>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {model && (
        <div className='model'>
         <div className='model-content'>
         <span className='close' onClick={close}>&times;</span>
         <h1>{userData.id ? "Update Record" : "Add Record"}</h1>
         <div className="input-group">
          <label htmlFor="name">Full Name <br/> <input type="text" name="name" required id="name" value={userData.name} onChange={handleData}  /></label><br></br>
          <label htmlFor="age">Age <br/> <input type="number" name='age' id='age' value={userData.age} onChange={handleData} required /></label><br></br>
          <label htmlFor="city">City <br/> <input type="text" name='city' id='city' value={userData.city} onChange={handleData} required /></label><br></br>
          {/* <button className='btn green' onClick={handleSubmit}>{userData.id ? "Update Record" : "Add Record"}</button> */}
          {userData.id ? <input type="submit" value="Update" className='btn green' onClick={handleSubmit} /> :<input type="submit" value="Add" className='btn green' onClick={handleSubmit} /> }
         </div>

         </div>
        </div>
      )}
    </div>
    </>
  )
}

export default App
