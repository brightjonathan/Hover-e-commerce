import React from 'react';
import styles from './ProductItem.module.scss';
import Card from '../../Card/Card';
import { Link } from 'react-router-dom';


const ProductItems = ({Productitems, Grid}) => {

  //De-structuring 
  const {id, ProductName, imageURL, Price, Category, Brand, Description} = Productitems;
  
  //Added a comma func... to the Price
  let RealPrice = Price;
  RealPrice = Number(RealPrice).toLocaleString('en-US');

  //Fourthy Percent discount and added a comma func...
  let discount = Price * 60 / 100;
  const TotalDiscount =  Price + discount
  const PriceWithComma = Number(TotalDiscount).toLocaleString('en-US');
  
  //money-saved 
  let moneySaved = Price * 60 / 100;
  const TotalMoneysaved = Number(moneySaved).toLocaleString('en-US');


  //shorten text func...
  const ShortenText = (text, numberOfText)=>{
    if (text.length > numberOfText) {
      const shortenedText = text.substring(0, numberOfText).concat('...');
      return shortenedText;
    }
    return text;
  };


  return (
    <Card className={Grid ? `grid md:grid-cols-7 px-2 pt-4 text-center gap-2 ` : `grid md:grid-cols-2 px-2 pt-4 text-center gap-4`}>
         <div className='border py-8 rounded-xl hover:shadow-2xl'>
            <Link to={`/product-details/${id}`}>
              <div className={styles.img}>
                <img src={imageURL} alt={ProductName} />
              </div>
            </Link>
            <div className={styles.content}>
              <div className={styles.details}>
                <h4>{ShortenText(ProductName, 18)}</h4> 
                <p> <h4 className='text-[green]'>&#x20A6;{`${RealPrice}`}</h4> &nbsp; &nbsp;
                    <span className='line-through text-[red] text-[15px] '>&#x20A6;{PriceWithComma} </span> <br/> 
                    <span className='text-[15px] px-1' >You save <i className='text-[green]'>&#x20A6;{TotalMoneysaved}</i></span> 
                </p>
              </div>
           {!Grid && <p className='font-mono pt-4'>{ShortenText(Description, 180)}</p>} 
          <button className="w-[80%] py-4 my-4 bg-slate-900 text-white rounded-2xl text-2xl font-bold " > Add To Cart </button>
        </div>
        </div>
    </Card>
  )
}

export default ProductItems;



