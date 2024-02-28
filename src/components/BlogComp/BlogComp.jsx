"use client"
import { Box, Button } from '@mui/material'
import React from 'react'
import styles from './BlogComp.module.css'
import { useRouter } from 'next/navigation'

const BlogComp = () => {
  const router = useRouter()
  return (
    <Box className={styles.card}  >
         
        <p style={{fontSize:'25px',color:'#000',fontWeight:'bold'}}>Blogs</p>   

        <Button  onClick={()=>router.push('/dashboard/bloglist')}       style={{background:'#f8b500'}}  sx={{mt:'2rem',border:'none',background:'#f8b500',textTransform:'none',color:'#fff','&:hover':{background:'#434343',color:'#fff'}}}>Update Blogs</Button>
    </Box>
  )
}

export default BlogComp