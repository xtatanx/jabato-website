import Image from 'next/image';
import { inter } from '@/app/ui/fonts';
import Button from './ui/Button';
import amberImage from '@/public/cerveza-jabato-lata-amber-ale.png';
import porterImage from '@/public/cerveza-jabato-lata-porter.png';

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center md:items-left justify-center h-[110vh] bg-black">
      <div className="absolute left-5 md:left-20 bottom-30 md:bottom-10 w-[140px] md:w-[180px] h-[180px] md:h-[340px]">
        <Image
          src={amberImage}
          alt="Lata de cerveza Jabato tipo amber ale"
          width={680}
          height={1040}
          quality={100}
        />
      </div>
      <div className="absolute top-60 md:top-30 flex flex-col justify-evenly items-center rounded-2xl w-[85%] md:w-[45%] h-[40%] md:h-[55%] p-2 z-2">
        <h1
          className={`${inter.className} text-7xl md:text-[7rem] font-bold text-white`}
        >
          404
        </h1>
        <p
          className={`${inter.className} text-xl md:text-[2rem] mt-2 font-bold text-white text-center`}
        >
          Ooops, creo que la embarramos!
        </p>
        <span
          className={`${inter.className} text-[.6rem] md:text-[1rem] text-center mt-[2%] text-white w-[70%]`}
        >
          Parece que has hecho click en un link errado o has ingresado a una
          dirección fallida. Puedes regresar al Home para seguir conociendo.
        </span>
        <div className="bottom-0 md:bottom-2 w-[32%] h-[18%] md:h-[15px]">
          <Button
            width={60}
            height={26}
            to="/"
            target="_self"
            variant="primary"
          >
            Regresar
          </Button>
        </div>
      </div>
      <div className="absolute  right-10 md:right-20 top-15 md:top-20 w-[140px] md:w-[180px] h-[200px] md:h-[340px] z-1">
        <Image
          src={porterImage}
          alt="Lata de cerveza Jabato tipo porter"
          width={680}
          height={1040}
          quality={100}
        />
      </div>
    </div>
  );
}
