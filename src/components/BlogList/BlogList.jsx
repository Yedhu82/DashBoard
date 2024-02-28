"use client"
import { Avatar, Box, Button, Container, Typography } from '@mui/material'
import Image from 'next/image'
import  User from '../../../public/User.jpg'
import  User1 from '../../../public/avatar.jpeg'
import  Edit from '../../../public/edit.webp'
import  Add from '../../../public/add.png'
import Delete from '../../../public/delete.png'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar/Navbar'
import AddWork from '../AddWork/AddWork'
import EditWork from '../EditWork/EditWork'
import Loader from '../AddImage/Loader/Loader'
import Swal from 'sweetalert2'
import AddBlog from '../AddBlog/AddBlog'
import EditBlog from '../EditBlog/EditBlog'
const BlogList = () => {
    
    const [open,setOpen] = useState(false)
    const [open1,setOpen1] = useState(false)
    const [works,setWorks] = useState([])
    const [workId,setWorkId] = useState('')
    const [trigger,setTrigger] = useState(false)
    const [loading,setLoading] = useState(false)



    useEffect(()=>{
        const fetchWorks = async()=>{

          const res = await fetch('/api/getAllBlogs',{
            method:'GET',
            headers:{
              'Content-Type':'application/json'
            }
          })

          const response = await res.json()
          if(res.ok){
            setWorks(response)
          }
         
        }

        fetchWorks()
    },[trigger])


    const handleAddWork = ()=>{
        setOpen(true)
    }

    const handleEditWork = (workId)=>{
      setOpen1(true)
      setWorkId(workId)
  }
   
  const handleDelete = async(workId)=>{
    try {
      setLoading(true)
 const res = await fetch(`/api/deleteblog/${workId}`,{
  method:'DELETE',
  headers:{
    'Content-Type':'application/json'
  }
 })

 const response = await res.json()

 if(res.ok){
  setLoading(false)
  Swal.fire({
    icon: "success",
    title: "Delete Success",
    text: "Work deleteed Success",
    
  });
  setTrigger(!trigger)
 }else{
  setLoading(false)
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: response,
   
  });
 }


    } catch (error) {
      setLoading(false)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
       
      });
    }
  }

    
    const handleClose = ()=>{
        setOpen(false)
        setTrigger(!trigger)
    }

    const handleClose1 = ()=>{
      setOpen1(false)
      setTrigger(!trigger)
  }





  return (
    <Box sx={{background:'linear-gradient(to right, #141e30, #243b55)',height:'100dvh',overflow:'auto',width:'100%',display:'flex',flexDirection:'column',alignItems:'center' }}>
         <Container sx={{pt:'1rem'}} >
          <Navbar />
        </Container>

        <Container sx={{pt:'1rem'}}>


            <Box sx={{display:'flex',justifyContent:'flex-end',mt:'1rem'}}>
                <Button onClick={handleAddWork} style={{background:'#fff',}} sx={{background:'#fff',mr:'1rem',p:'0.5rem 1.5rem' , textTransform:'none',color:'#3B4371',fontWeight:'bold','&:hover':{background:'#fff',color:'#3B4371'},display:'flex',alignItems:'center',gap:'0.5rem'}}>
                <Image src={Add}  width={25} height={25}  alt='add' />
                <Typography fontSize='14px' mt='0.2rem' fontWeight='bold'>Add Blog</Typography>    
                    
                </Button>
            </Box>
         
         <Box sx={{background:'#fff',borderRadius:'5px',p:'1rem',mt:'1rem'}}>
         <Typography fontSize='25px' fontWeight='bold'>Blogs</Typography>
         </Box>

         <Box sx={{p:'1rem',mt:'0.5rem',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'0.5rem'}}>
       
         <Box sx={{borderRadius:'5px',width:'25%',background:'#fff',display:'grid',placeItems:'center',p:'0.5rem 0rem'}}>
         <Typography fontSize='18px' color='#c0c0aa' fontWeight='bold'>Titile</Typography>
         </Box>
         <Box sx={{borderRadius:'5px',width:'25%',background:'#fff',display:'grid',placeItems:'center',p:'0.5rem 0rem'}}>
         <Typography fontSize='18px' color='#c0c0aa' fontWeight='bold'>Subtitile</Typography>
         </Box>
         <Box sx={{borderRadius:'5px',width:'25%',background:'#fff',display:'grid',placeItems:'center',p:'0.5rem 0rem'}}>
         <Typography fontSize='18px' color='#c0c0aa' fontWeight='bold'>Description</Typography>
         </Box>
         <Box sx={{borderRadius:'5px',width:'25%',background:'#fff',display:'grid',placeItems:'center',p:'0.5rem 0rem'}}>
         <Typography fontSize='18px' color='#c0c0aa' fontWeight='bold'>Image</Typography>
         </Box>

        
          <Box sx={{borderRadius:'5px',width:'25%',background:'#fff',display:'flex',justifyContent:'center',gap:'1rem',p:'0.5rem 0rem'}}>
           
           <Typography fontSize='18px' color='#c0c0aa' fontWeight='bold'>Options</Typography>
         </Box> 
        
         </Box>
         <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
        <Box sx={{ background:'#fff',height:'1px',width:'95%'}}></Box>
        </Box>


        {works.map((work)=>{
            const description = work?.description;
            const truncatedDescription = description && description.length > 15 ? description.substring(0, 15) + '...' : description;
            
            
            return(
          <Box key={work._id} sx={{p:'0rem  1rem',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'0.5rem'}}>
       
          <Box sx={{borderRadius:'5px',width:'25%',background:'#fff',display:'grid',placeItems:'center',p:'0.5rem 0rem'}}>
          <Typography fontSize='16px' fontWeight='bold'>{work?.title}</Typography>
          </Box>
          <Box sx={{borderRadius:'5px',width:'25%',background:'#fff',display:'grid',placeItems:'center',p:'0.5rem 0rem'}}>
          <Typography fontSize='16px' fontWeight='bold'>{work?.subtitle}</Typography>
          </Box>
          <Box sx={{borderRadius:'5px',width:'25%',background:'#fff',display:'grid',placeItems:'center',p:'0.5rem 0rem'}}>
          <Typography fontSize='16px' style={{
    
    maxHeight: "24px", // Adjust according to your font size and line height
    lineHeight: "1.5em",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }}  fontWeight='bold'>{truncatedDescription}</Typography>
          </Box>
          
          <Box sx={{borderRadius:'5px',width:'25%',display:'grid',placeItems:'center',p:'0.5rem 0rem'}}>
           <Image src={work?.image ? work?.image : User} width={50} height={50} alt='img' />
           </Box>
   
           <Box sx={{borderRadius:'5px',width:'25%',background:'#fff',display:'flex',justifyContent:'center',gap:'1rem',p:'0.5rem 0rem'}}>
            <Image onClick={()=>handleEditWork(work._id)} src={Edit} alt='edit' width={30} height={30} style={{cursor:'pointer'}} />
            <Image onClick={()=>handleDelete(work._id)}    src={Delete} alt='edit' width={32} height={32} style={{cursor:'pointer'}} />
          </Box> 
         
          </Box>
        )})}
         




        </Container>
        <AddBlog dialog={open} onClose={handleClose} />
     {open1 && <EditBlog dialog={open1} onClose={handleClose1} id={workId} /> }   
    </Box>  
  )
}

export default BlogList