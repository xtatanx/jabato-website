import { anton, inter } from '@/app/ui/fonts';
import Hero from '@/app/ui/Hero';
import Products from './ui/Products';
import MainLayer from '@/app/ui/MainLayer';
import Image from 'next/image';
import hopImage from '@/public/hop.svg';
import secondBanner from '@/public/footer-image.png';
import amberImage from '@/public/cerveza-jabato-lata-amber-ale.png';
import porterImage from '@/public/cerveza-jabato-lata-porter.png';
import seltzerImage from '@/public/hard-seltzer-jabato-sandia-limon.png';
import caramelIcon from '@/public/i-caramel.png';
import coffeIcon from '@/public/i-coffee.png';
import waterMelonIcon from '@/public/i-watermelon.png';
import tangerineIcon from '@/public/i-tangerine.png';
import lemonIcon from '@/public/i-lemon.png';
import amberPatern from '@/public/amber-pattern.png';
import porterPattern from '@/public/porter-pattern.png';
import seltzserPattern from '@/public/seltzer-pattern.png';

export default function Home() {
  const products = [
    {
      id: 1,
      name: 'Amber Ale',
      variant: 'amber',
      carbonation: 'Media Baja',
      bitterness: 'Medio',
      alcohol: 5.5,
      thumb: amberImage,
      icons: [tangerineIcon, caramelIcon],
      pattern: amberPatern,
      description:
        'Cerveza tipo Amber Ale, con un color ámbar, notas a caramelo y un carácter cítrico, la hace nuestra cerveza favorita. Tiene el perfecto balance entre el dulce de la malta y el amargo de los lúpulos, es muy refrescante y con sabroso cuerpo.',
    },
    {
      id: 2,
      name: 'Porter',
      variant: 'porter',
      carbonation: 'Media Baja',
      bitterness: 'Medio',
      alcohol: 5.5,
      thumb: porterImage,
      icons: [coffeIcon, caramelIcon],
      pattern: porterPattern,
      description:
        'Cerveza tipo Porter con notas a caramelo, chocolate y café, le agregamos una adición extra de café Campo Alto (un emprendimiento, como nosotros) justo antes de empacarla, que le da mucha más fuerza a su sabor.',
    },
    {
      id: 3,
      name: 'Seltzer',
      variant: 'seltzer',
      carbonation: '',
      bitterness: '',
      alcohol: 5.5,
      thumb: seltzerImage,
      icons: [lemonIcon, waterMelonIcon],
      pattern: seltzserPattern,
      description:
        'Agua con gas, alcohol y mucho sabor. Dulce, acida, refrescante y con un ligero toque amargo, es una bebida elegante, algunos la consideran una opción saludable, nosotros solo creemos que es un hit!.',
    },
  ];

  return (
    <>
      <MainLayer />
      <Hero />
      <section className="flex justify-center items-center w-full h-80 bg-[url(/pattern.png)] bg-black">
        <h1
          className={`${anton.className} w-50 md:w-200 text-left md:text-center text-[3rem] md:text-[5rem] text-brandred`}
        >
          CERVEZAS CON CARÁCTER
        </h1>
      </section>
      <section className="flex flex-col w-full">
        {products.map((product) => (
          <Products
            key={product.id}
            id={product.id}
            variant={product.variant as 'amber' | 'porter' | 'seltzer'}
            name={product.name}
            bitterness={product.bitterness}
            carbonation={product.carbonation}
            alcohol={product.alcohol}
            thumb={product.thumb}
            description={product.description}
            icons={product.icons}
            pattern={product.pattern}
          />
        ))}
      </section>
      <section className="flex flex-col justify-evenly items-center w-full h-90 md:h-100 bg-[url(/pattern.png)] bg-black">
        <p
          className={`${inter.className} w-[85%] md:w-[50%] h-auto text-[1.2rem] md:text-[1.5rem] text-white text-center`}
        >
          Somos los luchadores, los que damos el salto al vacío, los que aun
          cuando tenemos miedo lo intentamos
        </p>
        <div className="w-10 h-1">
          <Image src={hopImage} width={30} height={30} alt="Hope icon" />
        </div>
        <h2
          className={`${anton.className} w-[80%] md:w-200 text-center md:text-center text-[1.5rem] md:text-[2rem] text-white`}
        >
          Somos grandes, desde pequeños
        </h2>
      </section>
      <section className="flex justify-center items-center w-full h-120 overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src={secondBanner}
          width={1365}
          height={709}
          alt="Cervezas Jabato tipo Porter y Amber Ale junto a la Hard Seltzer de Sandia y Limón"
        />
      </section>
    </>
  );
}
