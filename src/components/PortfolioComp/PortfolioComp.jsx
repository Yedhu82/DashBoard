"use client"
import { Box, Button } from '@mui/material'
import React from 'react'
import styles from './PortfolioComp.module.css'
import { useRouter } from 'next/navigation'
const PortfolioComp = () => {
  const router = useRouter()
  return (
    <Box className={styles.card} >
         
        <p style={{fontSize:'25px',color:'#000',fontWeight:'bold'}}>Portfolio</p>   

        <Button  onClick={()=>router.push('/dashboard/portfolio')} style={{background:'#f8b500'}}  sx={{mt:'2rem',border:'none',background:'#f8b500',textTransform:'none',color:'#fff','&:hover':{background:'#434343',color:'#fff'}}}>Update Portfolio</Button>
    </Box>
  )
}

export default PortfolioComp