import React from 'react'
import styles from './ProductFilter.module.scss';



const ProductFilters = () => {
  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
         <button>All</button>
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select name="brand">
          <option value="all">All</option>
        </select>
        <h4>Price</h4>
        <p>1500</p>
        <div className={styles.price}>
           <input type="radio" name='price' min='100' max='1000' />
        </div>
        <br />
        <button className='--btn --btn-danger'>Clear filter</button>

      </div>
      
    </div>
  )
}

export default ProductFilters;
