import React from 'react'
import styles from './PortMain.module.css'

const PortMain = () => {
  return (
    <div className={styles.card}>
  <div className={styles.image}>P</div>
  <div className={styles.cardinfo}  >
    <span>Main Portfolio</span>
    
  </div>
  <a className={styles.button}  href="/dashboard/editmainportfolio">Edit Now</a>
</div>
  )
}

export default PortMain