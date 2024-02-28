import React from 'react'
import styles from './PortCategory.module.css'

const PortCategory = () => {
  return (
    <div className={styles.card}>
  <div className={styles.image}>C</div>
  <div className={styles.cardinfo}  >
    <span>Portfolio Category</span>
    
  </div>
  <a className={styles.button}  href="/dashboard/editportcategory">Edit Now</a>
</div>
  )
}

export default PortCategory