import axios from 'axios'
import React, { useEffect } from 'react'
import axiosInstance from '../axiosInstance'


const Dashboard = () => {
  useEffect(()=>{
    const fetchProtectedData= async()=>{
        try{
            const response = await axiosInstance.get("/protected-view");
            console.log('Success: ',response.data)

        }
        catch(error){
            console.error("error fetching details",error)

        }
    } 
    fetchProtectedData();
  },[])

  return (
    <div>
      <h1 className='text-light'>This is Dashboard</h1>
    </div>
  )
}

export default Dashboard
