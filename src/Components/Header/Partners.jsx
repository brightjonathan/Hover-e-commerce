import Marquee from 'react-fast-marquee';
import generation from '../../Assests/generation.jpg';
import defacto from '../../Assests/defacto.png';
import hm from '../../Assests/hm.png';
import justshoes from '../../Assests/justshoes.jpg';
import megir from '../../Assests/megir.png';
import minifocus from '../../Assests/minifocus.png';
import sedge from '../../Assests/sedge.png';
import skmei from '../../Assests/skmei.png';
import zanzea from '../../Assests/zanzea.png';
import adidas from '../../Assests/adidas.jpg';




const Partners = () => {
  return (
    <div className='w-full py-16 p-2'>
        <div className='flex items-center justify-center py-8'>
            <h1 className='text-3xl text-[#986c55] tracking-widest font-bold uppercase heading'> Some Of Our Partners </h1>
        </div>

        <Marquee pauseOnHover speed={45} className='scrollbar-hide'>
            <div><img src={generation} alt="/" className='hover:scale-110 ease-in duration-200' /></div>
            <div><img src={defacto} alt="/" className='hover:scale-110 ease-in duration-200' /></div>
            <div><img src={hm} alt="/" className='hover:scale-110 ease-in duration-200' /></div>
            <div><img src={justshoes} alt="/" className='hover:scale-110 ease-in duration-200' /></div>
            <div><img src={megir} alt="/" className='hover:scale-110 ease-in duration-200' /></div>
            <div><img src={minifocus} alt="/" className='hover:scale-110 ease-in duration-200' /></div>
            <div><img src={sedge} alt="/" className='hover:scale-110 ease-in duration-200' /></div>
            <div><img src={skmei} alt="/" className='hover:scale-110 ease-in duration-200' /></div>
            <div><img src={zanzea} alt="/" className='hover:scale-110 ease-in duration-200' /></div>
            <div><img src={adidas} alt="/" className='hover:scale-110 ease-in duration-200' /></div>
        </Marquee>
    </div>
  )
}

export default Partners;
