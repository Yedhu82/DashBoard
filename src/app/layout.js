
"use client"
import "./globals.css";
import localFont from 'next/font/local'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const myFont = localFont({name:'CirsularStdBook', src: '../fonts/CircularStd-Book.woff2',weight:'normal' })


const theme = createTheme({
  typography:{
    fontFamily:myFont.style.fontFamily
  },
  
 }) 


export default function RootLayout({ children }) {




  return (
    <html lang="en">
      <body className={myFont.className}>
      <ThemeProvider theme={theme} >
      <CssBaseline />
        {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
