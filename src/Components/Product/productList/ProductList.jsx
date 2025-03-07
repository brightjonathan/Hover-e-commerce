import { useState, useEffect } from 'react';
import Styles from './ProductList.module.scss';
import SearchApp from '../../Search/Search';
import ProductItems from '../productItem/ProductItems';
import { useDispatch, useSelector } from 'react-redux';
import {
  FILTER_BY_SEARCH,
  selectFilterProduct
} from "../../../Redux/Slice/FilterSlice";
import Pagination from '../../Pagination/Pagination';


const ProductList = ({products}) => {
 
   const dispatch = useDispatch();
   const [Grid, setGrid] = useState(true);
   const [Search, setSearch] = useState('');

   const filteredProducts = useSelector(selectFilterProduct);

     // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

    // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );


  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, Search }));
  }, [dispatch, products, Search]);


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
        {products.lenght === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {currentProducts.map((Productitems) => {
              return (
                <div key={Productitems.id}>
                  <ProductItems
                   Grid={Grid}
                   {...Productitems}
                   Productitems={Productitems} /> 
                </div>
              );
            })}
          </>
        )}
         <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </div>
  )
}

export default ProductList;

