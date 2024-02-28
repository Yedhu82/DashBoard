import React from 'react'
import styles from './PortImage.module.css'

const PortImage = () => {
  return (
    <div className={styles.card}>
  <div className={styles.image}>I</div>
  <div className={styles.cardinfo}  >
    <span>Portfolio Image</span>
    
  </div>
  <a className={styles.button}  href="/dashboard/portimg">Edit Now</a>
</div>
  )
}

export default PortImage