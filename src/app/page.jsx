"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Button } from "@mui/material";
import { useState } from "react";
import Loader from "./dashboard/profile/Loader/Loader";
import Swal from "sweetalert2";


export default function Home() {
  const router = useRouter()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)




  const handleLogin = async(e)=>{
  e.preventDefault()

  try {
    setLoading(true)
    const res = await fetch('/api/auth/login',{
      method:'POST',
      body:JSON.stringify({
        email,password
      }),
      headers:
               {
        'Content-Type':'application/json'
              }
    })
  const response = await res.json()
    if(res.ok){
      setLoading(false)
      router.push('/dashboard')
      localStorage.setItem('adminId' ,response._id)
    }
    else{
      setLoading(false)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response,
      
      });
      
    }
  } catch (error) {
    setLoading(false)
    alert(error.message)
  }
  




  }

  return (
<div style={{backgroundImage:"url('/100.jpg')",height:'100dvh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
  <div>
    <p style={{fontFamily:'Rubik',color:'#fff', fontSize:'35px',fontWeight:'600'}}>Folio Dash</p>
    <div style={{width:'100%',height:'4px',background:'#fff'}}></div>
  </div>

  <div style={{width:'60%',height:'300px',background:'#fff',borderRadius:'25px',boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.1)',marginTop:'1rem',padding:'1rem'}}>
       <div style={{marginTop:'1rem'}}>
      <p style={{fontFamily:'Rubik',fontSize:'17px',paddingLeft:'0.5rem' }}>Email</p>
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter the Email" style={{width:'100%',height:"50px",borderRadius:'25px',background:'#f3f6f9',border:'none',marginTop:'0.5rem',fontSize:'15px',padding:'1rem'}}/>
      </div>
      <div>
      <p style={{fontFamily:'Rubik',fontSize:'17px',paddingLeft:'0.5rem',marginTop:'1rem' }}>Password</p>
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter the Password" style={{width:'100%',height:"50px",borderRadius:'25px',background:'#f3f6f9',border:'none',marginTop:'0.5rem',fontSize:'15px',padding:'1rem'}}/>
      </div>

      <div style={{display:'grid',placeItems:'center',marginTop:'1.5rem'}}>
            <Button disabled={loading} onClick={handleLogin} style={{background:'linear-gradient(to right, #0f0c29, #302b63, #24243e)',cursor:'pointer',width:'150px',height:'45px',borderRadius:'25px',border:'none',color:'#fff',fontWeight:'bold' }} endIcon={ !loading && <LockOpenIcon style={{width:'15px',height:'15px'}} />}>
            {loading==true ? <Loader/> : 'Login Now'}    
              </Button>
            
      </div>
  </div>
</div>
  );
}
