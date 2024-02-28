"use client"
import { Box, Button } from '@mui/material'
import React from 'react'
import styles from './ProfileComp.module.css'
import { useRouter } from 'next/navigation'

const ProfileComp = () => {
  const router = useRouter()



  return (
    <Box className={styles.card} sx={{background:"url('/avatar.jpeg')"}}>
       <p style={{fontSize:'25px',color:'#000',fontWeight:'bold'}}>Profile</p>   

        <Button onClick={()=>router.push('/dashboard/profile')} style={{background:'#f8b500'}} sx={{mt:'2rem',border:'none',background:'#f8b500',textTransform:'none',color:'#fff','&:hover':{background:'#434343',color:'#fff'}}}>Update profile</Button>
    </Box>
  )
}

export default ProfileComp