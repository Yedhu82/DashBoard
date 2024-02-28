"use client"
import { Avatar, Box, Button, Container, Typography } from '@mui/material'
import Image from 'next/image'
import  User from '../../../../public/User.jpg'
import  User1 from '../../../../public/avatar.jpeg'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar/Navbar'
import Swal from 'sweetalert2'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Loader from './Loader/Loader'


const Profile = () => {
    const [image,setImage]=useState(null)
    const [loading,setLoading]=useState(false)
    const [imageUrl,setImageUrl] = useState('')
    const [trigger,setTrigger] = useState(false)
    const imageRef = useRef()
    
    const handleImageEdit = ()=>{
        imageRef.current.click()
    }
  

    useEffect(()=>{
     const fetchAdmin =async()=>{
       const adminId = localStorage.getItem('adminId')
      const res = await fetch(`/api/fetchAdmin/${adminId}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      })

      const response = await res.json()
      console.log(response,'admin');
      if(res.ok){
        setImageUrl(response.imageUrl)
      }
     }
fetchAdmin()
    },[trigger])

    const handleUpload = (e) => {
        const selectedImage = e.target.files[0];
        console.log(selectedImage); // Check the selected image
        if (selectedImage) {
          
          setImage(selectedImage)
          const nwimageUrl = URL.createObjectURL(selectedImage);
          setImageUrl(nwimageUrl);
        }
      };
      const handleEdit=async(e)=>{
        e.preventDefault();
        if(image == null){
          return
        }
       console.log(image,'img');
        try {
          setLoading(true)
            const formData = new FormData()
            formData.append('imageUrl',image)
            const res = await fetch('/api/editProfileImage',{
                method:'POST',
                body:formData
            })
            const response = await res.json()
            if(res.ok){
              setLoading(false)
              setTrigger(true)
            }else{
              setLoading(false)
              setTrigger(true)
            }
            console.log(response,'response');
        } catch (error) {
          setLoading(false)
          setTrigger(true)
        }
      }

  return (
    <Box sx={{background:'linear-gradient(to right, #141e30, #243b55)',height:'100dvh',overflow:'auto',width:'100%',display:'flex',flexDirection:'column',alignItems:'center' }}>
        <Container sx={{pt:'1rem'}} >
          <Navbar/>
        </Container>
        
        <Container sx={{pt:'1rem'}}>
            <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <Box sx={{position:'relative'}}>
                 <Avatar sx={{height:'500px',width:'500px'}}>
              {imageUrl &&  <Image src={ imageUrl} width={500} height={500}  style={{width:'100%',height:'100%',}} alt='user' />}
                 </Avatar>
                  
                 <Box onClick={handleImageEdit} sx={{ position: 'absolute', bottom: '50px', right: '50px', padding:'11px',pb:'5px',borderRadius:'50%',background:'#f3f6f9',zIndex:99,cursor:'pointer' }}>
                            <CameraAltIcon  style={{color:'#000'}}/>
                    </Box>
                    <input
                    type='file'
                    ref={imageRef}
                    onChange={handleUpload}
                    style={{display:'none'}}
                    />
                 </Box>




                 <Button disabled={loading} style={{background:'#F29492'}} onClick={handleEdit} sx={{mt:'4rem',height:'45px',textTransform:'none',color:'#fff' ,background:'#F29492',padding:'0.5rem 1rem','&:hover':{color:'#fff' ,background:'#F29492'}}}>
                  {loading == true ? <Loader /> : 'Edit Profile Image'}   
                 </Button>



            </Box>
        </Container>

    </Box>
  )
}

export default Profile