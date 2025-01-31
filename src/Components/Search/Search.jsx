import React from 'react'
import Styles from './Search.module.scss'
import {BiSearch} from 'react-icons/bi';


const Search = ({value, onChange}) => {
  return (
    <div className={Styles.search}>
      <BiSearch size={18} className={Styles.icon}/>
      <input 
      type="text" 
      placeholder='Search by name' value={value} onChange={onChange} />
    </div>
  )
}

export default Search;
