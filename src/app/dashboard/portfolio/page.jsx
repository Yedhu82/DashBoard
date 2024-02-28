import PortMain from '@/components/PortMain/PortMain'
import Navbar from '@/components/Navbar/Navbar'
import { Box, Container } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid';
import PortCategory from '@/components/PortCategory/PortMain/PortCategory';
import PortImage from '@/components/PortImage/PortImage';

const page = () => {
  return (
    <Box sx={{background:'linear-gradient(to right, #141e30, #243b55)',height:'100dvh',overflow:'auto',width:'100%',display:'flex',flexDirection:'column',alignItems:'center' }}>
        <Container sx={{pt:'1rem'}} >
          <Navbar />
        </Container>

        <Container sx={{pt:'1rem'}} >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
        direction='column'
        justifyContent='center'
        alignItems='center'
        >
        <Grid item xs={12}>
           <PortMain />
           </Grid>
         </Grid>


        <Box sx={{display:'flex',alignItems:'center',gap:'2rem',justifyContent:'space-between',mt:'1.5rem',flexDirection:{xs:'column',sm:'column',md:'row',lg:'row',xl:'row'}}}>
          <Box>
          <PortCategory />
          </Box>


          <Box>
          <PortImage />
            </Box>
        </Box>

        </Container>


    </Box>
  )
}

export default page