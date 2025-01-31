// import img1 from '../../Assests/ads1.png';
// import img2 from '../../Assests/ads2.png';
// import img3 from '../../Assests/ads3.png';


const AdPage = () => {
  return (

    <div className='flex flex-col items-center mt-[5vh]'>
      <div className='container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
        <img className='w-full' src='https://i.ibb.co/Z2cnBhY/ads1.png' alt='image-1' loading='lazy' />
        <img className='w-full' src='https://i.ibb.co/MZ4gPfC/ads2.png' alt='image-2' loading='lazy' />
        <img className='w-full' src='https://i.ibb.co/k4Ct1g6/ads3.png' alt='image-3' loading='lazy' />
      </div>
    </div>
  )
}

export default AdPage;
