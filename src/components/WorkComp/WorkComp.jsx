"use client"
import { Box, Button } from '@mui/material'
import React from 'react'
import styles from './WorkComp.module.css'
import { useRouter } from 'next/navigation'

const WorkComp = () => {
  const router = useRouter()
  return (
    <Box className={styles.card}  >
         
         <p style={{fontSize:'25px' ,color:'#000',fontWeight:'bold'}}>Works</p>   

        <Button onClick={()=>router.push('/dashboard/works')} style={{background:'#f8b500'}} sx={{mt:'2rem',border:'none',background:'#f8b500',textTransform:'none',color:'#fff','&:hover':{background:'#434343',color:'#fff'}}}>Update Work</Button>
    </Box>
  )
}

export default WorkComp