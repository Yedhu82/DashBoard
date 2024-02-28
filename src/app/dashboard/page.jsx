import BlogComp from '@/components/BlogComp/BlogComp';
import Navbar from '@/components/Navbar/Navbar';
import PortfolioComp from '@/components/PortfolioComp/PortfolioComp';
import ProfileComp from '@/components/ProfileComp/ProfileComp';
import WorkComp from '@/components/WorkComp/WorkComp';
import { Box, Container } from '@mui/material'
import Grid from '@mui/material/Grid';
import React from 'react'

const DashBoard = () => {
  return (
    
      <Box sx={{background:'linear-gradient(to right, #141e30, #243b55)',height:'100dvh',overflow:'auto',width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
           <Container sx={{pt:'1rem'}} >
          <Navbar/>
          </Container>
           <Box sx={{pt:'3rem',pb:'3rem'}}>
           <Container >
          <Grid container rowSpacing={2} columnSpacing={{ xs: 4, sm: 4, md: 4 }} 
          direction='row'
          alignItems='center'
          justifyContent='center'
          sx={{pl:{xs:'2.3rem',sm:'2rem',md:'1.5rem',lg:'3rem'}}}
          >
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <ProfileComp/>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <WorkComp/>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <BlogComp/>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <PortfolioComp/>
          </Grid>
          

          </Grid>
          </Container>
          </Box>
      </Box>

   
  )
}

export default DashBoard