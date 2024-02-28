import { Box, Typography } from '@mui/material'
import React from 'react'
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import Avtar from '../../../public/avatar.jpeg'


const Navbar = () => {
  return (
    <Box sx={{height:'90px',width:'100%',background:'#fff',borderRadius:'15px',display:'flex',justifyContent:'space-between' , alignItems:'center',p:'1rem'}}>
        
        <Typography fontWeight='600' fontSize='25px' color='#243B55'>Welcome </Typography>



<Avatar sx={{cursor:'pointer'}}>
    <Image src={Avtar} width={50} height={50} objectFit='cover' alt='user' />
</Avatar>

    </Box>
  )
}

export default Navbar