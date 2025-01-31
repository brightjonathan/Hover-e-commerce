import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';


const Maquee = () => {
  return (
    <div >
      <Marquee className='bg-[#E70680]' gradient={false} pauseOnHover speed={40}>
            <div className='justify-center items-center gap-10 w-full h-[4rem] flex '>
               <Link to='#'><div className='cursor-pointer text-[#dbdbdb] hover:scale-110 ease-in duration-200 px-4 text-3xl'>What's New</div></Link> 
                <Link to='#'> <div className='cursor-pointer text-[#dbdbdb] hover:scale-110 ease-in duration-200 text-3xl'>Flash Sale</div></Link>
                <Link to='#'> <div className='cursor-pointer text-[#dbdbdb] hover:scale-110 ease-in duration-200 text-3xl'>Dresses</div> </Link>
                 <Link to='#'> <div className='cursor-pointer text-[#dbdbdb] hover:scale-110 ease-in duration-200 text-3xl'>Top</div> </Link>
                 <Link to='#'> <div className='cursor-pointer text-[#dbdbdb] hover:scale-110 ease-in duration-200 text-3xl'>Lingerie & Lounge</div> </Link>
                 <Link to='#'> <div className='cursor-pointer text-[#dbdbdb] hover:scale-110 ease-in duration-200 text-3xl'>Beachwear</div> </Link>
                 <Link to='#'> <div className='cursor-pointer text-[#dbdbdb] hover:scale-110 ease-in duration-200 text-3xl'>Active Wear</div> </Link>
                 <Link to='#'> <div className='cursor-pointer text-[#dbdbdb] hover:scale-110 ease-in duration-200 text-3xl'>Summer Sale</div> </Link>
                 <Link to='#'> <div className='cursor-pointer text-[#dbdbdb] hover:scale-110 ease-in duration-200 text-3xl'>Top Brands</div> </Link>
            </div>
        </Marquee>
    </div>
  )
}

export default Maquee;


