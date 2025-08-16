import React ,{useState}from 'react'
import axios from 'axios'



const Register = () => {
   const [username,Setusername]=useState("")
   const [email,Setemail] = useState("")
   const[password,Setpassword]=useState("")
   const[errors,setErrors] = useState({})
  const[success,setSuccess]=useState(false)
  const[loading,Setloading]=useState(false)

   const handleRegistration =async(e)=>{
    e.preventDefault();
    Setloading(true);
    console.log('test');
    const userData = {
      username,email,password
    }
    console.log(userData);
    try{
      const response =await axios.post('http://127.0.0.1:8000/api/v1/register/',userData)
      console.log('response.data==>',response.data)
      console.log('Registration successful');
      setErrors("")
      setSuccess(true)
    }catch(error){
      setErrors(error.response.data)
      console.error(error.response.data)
    }finally{
      Setloading(false)
    }


   }


  return (
    <>
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6 bg-light-dark p-5 rounded'>
        <h3 className='text-light text-center'>Create an Account</h3>
        <form onSubmit={handleRegistration}>
          <div className='mb-4'>
          <input type='text' className='form-control  mt-4'placeholder='Username' value={username} onChange={(e)=>Setusername(e.target.value)}></input>
          <small>{errors.username && <div className='text-danger'>{errors.username}</div>}</small>
          </div>
          <div className='mb-4'>
             <input type='email' className='form-control ' placeholder='Email address' value={email} onChange={(e)=>Setemail(e.target.value)} ></input>
               <small>{errors.email && <div className='text-danger'>{errors.email}</div>}</small>
         
          </div>
          <div className='mb-4'>
            <input type='password' className='form-control' placeholder='Password' value={password} onChange={(e)=>Setpassword(e.target.value)}></input>
           <small>{errors.password && <div className='text-danger'>{errors.password}</div>}</small>
         
          </div>
          {success && <div className='alert alert-success' disabled>Registration Successfu</div>}
          {loading ?( <button type='submit' className='btn btn-info d-block mx-auto'>Loading please wait...</button>
       ):(<button type='submit' className='btn btn-info d-block mx-auto'>Register</button>
       )}
           
        </form>
        </div>
      </div>
       
    </div>
    </>
  )
}

export default Register
