"use client"
import Navbar from '@/components/Navbar/Navbar'
import { Avatar, Box, Button, Container } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import Grid from '@mui/material/Grid';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Image from 'next/image';
import Loader from '../profile/Loader/Loader';

const Page = () => {
     const [imageUrl,setImageUrl] = useState('')
     const [image,setImage] = useState(null)
     const [id,setId] = useState('')
     const [loading,setLoading]=useState(false)
     const [trigger,setTrigger] = useState(false)
     const imageRef = useRef()


     useEffect(()=>{
        
      const  fetchCategory = async ()=>{
  
        const res =await fetch('/api/getCategory',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })

        const response = await res.json()
        console.log(response,'res');
        setImageUrl(response.image)
        setId(response._id)
        


      }

      fetchCategory()


     },[trigger])


     const handleImageEdit = ()=>{
        imageRef.current.click()
    }


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
            formData.append('image',image)
            formData.append('id',id)
            const res = await fetch('/api/editCategoryImage',{
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
      <Navbar />
    </Container>

    <Container sx={{pt:'1rem'}} >
        
        <Box sx={{m:'2rem 5rem',background:'#fff',minHeight:'600px',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'2rem'}}>
        <Box sx={{position:'relative'}}>
            <Avatar sx={{width:'350px' , height:'350px'}}>
          {imageUrl && ( <Image src={imageUrl} alt='img'  width={350} height={350} />  )}      
            </Avatar>
            <Box onClick={handleImageEdit} style={{position: 'absolute', bottom: '20px', right: '55px',borderRadius:'50%',padding:'2px'}}  sx={{ position: 'absolute', bottom: '20px', right: '0px', padding:'8px',borderRadius:'50%',background:'#000',zIndex:99,cursor:'pointer' }}>
                            <CameraAltIcon  style={{color:'#fff',fontSize:'15px'}}/>
                    </Box>
                    <input
                    type='file'
                    ref={imageRef}
                    onChange={handleUpload}
                    style={{display:'none'}}
                    />
        </Box>

        <Button disabled={loading} onClick={handleEdit} style={{background:'#0575e6'}} sx={{background:'#0575e6',color:'#fff',height:'45px',width:'150px',textTransform:'none','&:hover':{background:'#0575e6',color:'#fff'}}}>
            {loading==true? <Loader/>:'Update Cover'}
            </Button>
        </Box>
 
    </Container>


</Box>
  )
}

export default Page