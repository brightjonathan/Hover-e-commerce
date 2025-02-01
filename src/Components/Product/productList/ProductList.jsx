import { useState, useEffect } from 'react';
import Styles from './ProductList.module.scss';
import {BsFillGridFill} from 'react-icons/bs'
import {FaListAlt} from 'react-icons/fa'
import SearchApp from '../../Search/Search';
import ProductItems from '../productItem/ProductItems';
import { useDispatch, useSelector } from 'react-redux';


const ProductList = ({selectorProduct}) => {
 
   const [Grid, setGrid] = useState(true)
   const [Search, setSearch] = useState('');

   const dispatch = useDispatch();
   

   useEffect(()=>{
     
   },[]);

  return (
    <div className={Styles["product-list"]} id="product">
      <div className={Styles.top}>

        {/* <div className={Styles.icons}>
          <BsFillGridFill size={22} color="orangered" className='hover:stroke-2' onClick={() => setGrid(true)} />
          <FaListAlt size={24} color="#0066d4" className='hover:stroke-2' onClick={() => setGrid(false)} />
        </div> */}

        {/* Search Icon */}

        <div>
        <SearchApp value={Search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>

        {/* Sort Products */}
        {/* <div className={Styles.sort}>
          <label>Sort by:</label>
          <select>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div> */}
      </div>

      <div className={Grid ? `grid md:grid-cols-4 px-2 pt-4 text-center gap-4` : `grid md:grid-cols-3 px-2 pt-4 text-center gap-4`}>
        {selectorProduct.lenght === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {selectorProduct.map((Productitems) => {
              return (
                <div key={Productitems.id}>
                  <ProductItems
                   Grid={Grid}   
                   Productitems={Productitems} /> 
                </div>
              );
            })}
          </>
        )}        
      </div>
    </div>
  )
}

export default ProductList;

