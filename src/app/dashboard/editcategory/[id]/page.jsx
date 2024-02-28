"use client"
import Navbar from '@/components/Navbar/Navbar'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import React, {useRef, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Attach from '../../../../../public/attach.png'
import Loader from '../Loader/Loader'
import Swal from 'sweetalert2'



const Page = () => {
  const [category,setCategory] = useState({})
  const [title,setTitle] = useState('')
  const [subtitle,setSubtitle]=useState('')
  const [selectedFileName,setSelectedFileName] = useState('')
  const [image,setImage] = useState(null)
  const [imageUrl,setImageUrl] = useState('')
  const [loading,setLoading] = useState(false)
  const imageRef = useRef()
  const param = useParams()


  




 useEffect(()=>{
    const fetchCategory = async()=>{
   
      const res = await fetch(`/api/fetchCategory/${param.id}`,{
      method:'GET',
      headers:{
      'Content-Type':'application/json'
      }
      })
      const response = await res.json()
               
               setCategory(response)
               setTitle(response.title)
               setSubtitle(response.subtitle)



    }
    fetchCategory()


 },[])

 const handleImage = ()=>{
  imageRef.current.click()
}

const handleUpload = (e)=>{
  const selectedImage = e.target.files[0];
  if(selectedImage){
      setImage(selectedImage)
      setSelectedFileName(selectedImage.name)
      const nwimageUrl = URL.createObjectURL(selectedImage);
      setImageUrl(nwimageUrl);
  } 
}

const editCategory = async (e)=>{
  e.preventDefault()
  try {
    setLoading(true)
   const formData = new FormData()
      formData.append('title',title) 
      formData.append('subtitle',subtitle)
      if(image){
        formData.append('image',image)
      }
      formData.append('id',param.id)
  const res = await fetch('/api/editCategory',{
    method:'POST',
    body:formData
  })
  const response =await res.json()
  if(res.ok){
    setLoading(false)
    
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Work Added success",
    });
    
  }else{
    setLoading(false)
    
    Swal.fire({
      icon: "error",
      title: "Error",
      text: response,
    });
  
  }
  } catch (error) {
    setLoading(false)
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      }); 
    
  }
  

}


  return (
    <Box sx={{background:'linear-gradient(to right, #141e30, #243b55)',height:'100dvh',overflow:'auto',width:'100%',display:'flex',flexDirection:'column',alignItems:'center' }}>
    <Container sx={{pt:'1rem'}} >
      <Navbar />
    </Container>

    <Container >
      <Box sx={{width:'100%',p:'4rem',display:'flex',gap:'1rem',flexDirection:{xs:'column',sm:'column',md:'column',lg:'row',xl:'row'},alignItems:{xs:'center',sm:'center',md:'center',lg:'start',xl:'start'}}}>
        <Box sx={{height:'275px',width:'500px',background:'#fff',borderRadius:'6px',mt:'2rem',position:'relative'}}>
            <Image src={image ? imageUrl : category?.image} style={{borderRadius:'6px'}} alt='img' fill />        
        </Box>
        <Box sx={{display:'flex',flexDirection:'column',width:'100%'}}> 
              
               <Box sx={{background:'linear-gradient(to right, #fc466b, #3f5efb)',width:'100%',height:'70px',mt:'2rem',borderRadius:'6px'}}> 
                <TextField value={title} onChange={(e)=>setTitle(e.target.value)} sx={{width:'100%',"& fieldset": { border: 'none' },}} InputProps={{style:{fontSize:'25px',fontWeight:'bold',color:'#fff'}}} />
               </Box>

               <Box sx={{background:'linear-gradient(to right, #c94b4b, #4b134f)',width:'100%',height:'70px',mt:'2rem',borderRadius:'6px'}}>
                <TextField value={subtitle} onChange={(e)=>setSubtitle(e.target.value)} sx={{width:'100%',"& fieldset": { border: 'none' },}} InputProps={{style:{fontSize:'25px',fontWeight:'bold',color:'#fff'}}} />
               </Box>

               <Box sx={{background:'#fff',width:'100%',height:'70px',mt:'2rem',borderRadius:'6px'}}>
               <TextField  value={selectedFileName} placeholder='Upload an Image' sx={{width:'100%',mt:'0.1rem',"& fieldset": { border: 'none' },}} InputProps={{endAdornment:(<Image onClick={handleImage} style={{cursor:'pointer'}} src={Attach} width={20} height={20} alt='Attach' /> ),style:{color:'#000',fontSize:'25px'}  }} />
            <input
             type='file'
             onChange={handleUpload}
             ref={imageRef}
             style={{display:'none'}}
            />
               </Box>

               <Box sx={{background:'linear-gradient(to right, #00b09b, #96c93d)',width:'100%',height:'95px',mt:'2rem',borderRadius:'6px',display:'grid',placeItems:'center'}}>
               <Button onClick={editCategory} disabled={loading} sx={{textTransform:'none',fontSize:'20px',fontWeight:'bold',color:'#fff',width:'100%',height:'100%'}}>{ loading == true ? <Loader/> : 'Edit Category'}   </Button>
               </Box>

        </Box>


        </Box>
    </Container>
    </Box>
  )
}

export default Page