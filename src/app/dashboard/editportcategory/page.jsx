"use client"
import Navbar from '@/components/Navbar/Navbar'
import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Edit from '../../../../public/edit.png'
import { useRouter } from 'next/navigation'
const Page = () => {
     const [category,setCategory] = useState([])
     const router = useRouter()


    useEffect(() => {
        const fetchCategory = async () => {
            const res = await fetch('/api/getPortCategory', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const response = await res.json()
            setCategory(response)

        }

        fetchCategory()
    }, [])

    const handleEdit = (id)=>{
      router.push(`editcategory/${id}`)
    }



  return (

    <Box sx={{background:'linear-gradient(to right, #141e30, #243b55)',height:'100dvh',overflow:'auto',width:'100%',display:'flex',flexDirection:'column',alignItems:'center',pb:'1rem' }}>
    
    <Container sx={{pt:'1rem'}} >
      <Navbar />
    </Container>


    <Container sx={{pt:'2rem'}}>
       <Typography fontSize='35px' fontWeight='bold' color='#fff'>Categories</Typography>
       <Box sx={{height:'2px',background:'#fff',width:'180px'}}></Box>
     {category.map((cat)=>(
        <>
        <Box key={cat._id} sx={{display:'flex',alignItems:'center',justifyContent:'center',pt:'3rem',flexDirection:{xs:'column',sm:'column',md:'row',lg:'row',xl:'row'}}}>
       <Box sx={{ width: '300px', height: '300px', borderRadius: '50%', border: '3px dashed #fff' ,display:'grid',placeItems:'center',position:'relative',padding:'1rem' }}>
        <Image src={cat.image} fill style={{borderRadius:'50%'}} alt='catImg' /> 
       </Box>
       <Box sx={{height:{xs:'100px',sm:'100px',md:'2px',lg:'2px',xl:'2px'},background:'linear-gradient(to right, #141e30, #243b55)',border:'2px dashed #fff',width:{xs:'2px',sm:'2px',md:'100px',lg:'100px',xl:'100px'}}}></Box>
       <Box sx={{ width: '150px', height: '150px', borderRadius: '50%', border: '3px dashed #fff' ,display:'grid',placeItems:'center' }}>
        <Typography color='#fff' fontSize='20px' fontWeight='bold'>{cat.title}</Typography>
       </Box>
       <Box sx={{height:{xs:'80px',sm:'80px',md:'2px',lg:'2px',xl:'2px'},background:'linear-gradient(to right, #141e30, #243b55)',border:'2px dashed #fff',width:{xs:'2px',sm:'2px',md:'80px',lg:'80px',xl:'80px'}}}></Box>
       <Box sx={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px dashed #fff',display:'flex',justifyContent:'center',alignItems:'center'}}>
       <Typography color='#fff' fontSize='10px' >{cat.subtitle}</Typography>
       </Box>
       <Box sx={{height:{xs:'50px',sm:'50px',md:'2px',lg:'2px',xl:'2px'},background:'linear-gradient(to right, #141e30, #243b55)',border:'2px dashed #fff',width:{xs:'2px',sm:'2px',md:'50px',lg:'50px',xl:'50px'}}}></Box>
       <Box sx={{ width: '50px', height: '50px', borderRadius: '50%', border: '3px dashed #fff',display:'grid',placeItems:'center'}}>
       <Image onClick={()=>handleEdit(cat._id)} src={Edit} alt='img' width={40} height={40} style={{borderRadius:'50%',cursor:'pointer'}} />
       </Box>
       </Box>
       {/* <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
       <Box sx={{height:'2px',background:'#fff',width:'50%',mt:'1.5rem'}}></Box>
       </Box> */}
       </>

     ))}
       


    </Container>

    </Box>
  )
}

export default Page