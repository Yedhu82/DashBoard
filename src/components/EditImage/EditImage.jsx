"use client"
import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, TextField, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Attach from '../../../public/attach.png'
import Image from 'next/image';
import Loader from './Loader/Loader';
import Swal from 'sweetalert2';


export default function EditImage({dialog,onClose,id}) {
  const [open, setOpen] = useState(false);
  const [title,setTitle] = useState('')
  const [subtitle,setSubtitle] = useState('')
  const [category,setCategory] = useState('')
  
  const [image,setImage] = useState(null)
  const [categories,setCategories] = useState([])
  const [selectedFileName,setSelectedFileName] = useState('')
  const [loading,setLoading] = useState(false)
  const imageRef = useRef()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

console.log(dialog,'hi dia');
  useEffect(()=>{   
    setOpen(dialog)
  },[])

  useEffect(()=>{
    const fetchCategory = async()=>{
 
      const res = await fetch('/api/getPortCategory',{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      })

      const response = await res.json()
      setCategories(response)  
       
    }
    
    fetchCategory()
  },[])

  console.log(id,'id vanne');

  useEffect(()=>{
   const fetchWork = async()=>{
    const res = await fetch(`/api/fetchImage/${id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    })

    const response = await res.json()
    if(res.ok){
      setTitle(response.title)
      setSubtitle(response.subtitle)
      setCategory(response.category)
      
    }
    console.log(response);
   }
   fetchWork()
  },[])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose()
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleImage = ()=>{
    imageRef.current.click()
  }

  const handleUpload = (e)=>{
    const selectedImage = e.target.files[0];
    if(selectedImage){
        setImage(selectedImage)
        setSelectedFileName(selectedImage.name)
    } 
  }

  const handleAddWork = async()=>{

    

    try{
      setLoading(true)
      const formData = new FormData()
      formData.append('title',title) 
      formData.append('subtitle',subtitle)
      formData.append('category',category)
      if(image){
        formData.append('image',image)
      }
      formData.append('id',id)
const res = await fetch('/api/editimage',{
  method:'POST',
  body:formData
})
const response = await res.json()
if(res.ok){
  setLoading(false)
  onClose()
  Swal.fire({
    icon: "success",
    title: "Success",
    text: "Work Added success",
  });
  
}else{
  setLoading(false)
  onClose()
  Swal.fire({
    icon: "error",
    title: "Error",
    text: response,
  });
 
}
console.log(response,'reswork');
    }catch(error){
      setLoading(false)
      onClose()
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      }); 
     
    }
  }



  
  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={dialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{ sx: { borderRadius: "10px" } }}
      >
        <DialogTitle style={{fontSize:'25px',fontWeight:'bold'}} id="responsive-dialog-title">
          {"Edit Work"}
        </DialogTitle>
        <DialogContent>
           <Box>
            <Typography fontSize='15px' fontWeight='bold'>Title</Typography>
            <TextField value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Add a title' sx={{width:'400px',mt:'0.1rem'}} InputProps={{style:{height:'45px'}}} />
           </Box>
           <Box sx={{mt:'1rem'}}>
            <Typography fontSize='15px' fontWeight='bold'>Subitle</Typography>
            <TextField value={subtitle} onChange={(e)=>setSubtitle(e.target.value)} placeholder='Add a Subtitle' sx={{width:'400px',mt:'0.1rem'}} InputProps={{style:{height:'45px'}}} />
           </Box>

           <Box sx={{mt:'1rem'}}>
            <Typography fontSize='15px' fontWeight='bold'>Category</Typography>
            <FormControl sx={{  width:'100%' }} size="small">
            <Select
             labelId="demo-select-small-label"
             id="demo-select-small"
             value={category}
             
             onChange={handleChange}
              >
        {categories.map((cat)=>(
        <MenuItem value={cat._id}>{cat.title}</MenuItem>
        ))}
        
      </Select>
    </FormControl>
           </Box>

          <Box sx={{mt:'1rem'}}>
            <Typography fontSize='15px' fontWeight='bold'>Image</Typography>
            <TextField  value={selectedFileName} placeholder='Upload an Image' sx={{width:'400px',mt:'0.1rem'}} InputProps={{endAdornment:(<Image onClick={handleImage} style={{cursor:'pointer'}} src={Attach} width={20} height={20} alt='Attach' /> ),  style:{height:'45px'}}} />
            <input
             type='file'
             onChange={handleUpload}
             ref={imageRef}
             style={{display:'none'}}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{mr:'1rem'}}>
          <Button disabled={loading} style={{background:'#ff6a00'}} sx={{background:'#ff6a00',width:'120px',color:'#fff',height:'45px',border:'none',p:'0.3rem 1rem',textTransform:'none','&:hover':{background:'#ff6a00',color:'#fff',}}} onClick={handleAddWork}>
          {loading == true ? <Loader/> : 'Create'}  
          </Button>
          <Button style={{background:'#556270'}} sx={{background:'#556270',color:'#fff',height:'45px',border:'none',p:'0.3rem 1rem',textTransform:'none','&:hover':{background:'#556270',color:'#fff',}}} onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
