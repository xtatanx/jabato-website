'use client';
import { inter } from '@/app/ui/fonts';
import Image from 'next/image';
import FooterLogo from '@/public/icon.png';
import WhatsAppIcon from '@/public/whatsapp-icon.svg';
import InstagramIcon from '@/public/instagram-icon.svg';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative flex flex-col shrink-0 justify-center items-center pt-[2%] w-full h-120 bg-brandblack">
      <Image
        src={FooterLogo}
        width={234}
        height={234}
        alt="Jabato logo"
        quality={100}
        className="absolute -top-30 flex w-[280px] h-[280px]"
      />
      <div
        className={`${inter.className} flex justify-center items-center w-full h-20 text-white`}
      >
        <p className="flex w-100 h-5 text-center text-[24px] justify-center">
          #apulsoyfrentera
        </p>
      </div>
      <div className="flex flex-row justify-center gap-[50px] items-center w-full h-20">
        <a
          href="https://www.instagram.com/jabato.cerveceria/?hl=en"
          target="_blank"
          className="w-[50px] h-[50px]"
        >
          <Image
            src={InstagramIcon}
            width={50}
            height={50}
            alt="Instagram Icon"
          />
        </a>
        <a
          href="https://wa.me/573337058517"
          target="_blank"
          className="w-[50px] h-[50px]"
        >
          <Image
            src={WhatsAppIcon}
            width={50}
            height={50}
            alt="WhatsApp Icon"
          />
        </a>
      </div>
      <div
        className={`${inter.className} absolute bottom-[10%] flex flex-row justify-center items-center text-white text-[0.8rem] md:text-sm bg-brandgray w-full h-20 md:h-10`}
      >
        <p className="w-[90%] text-center">
          Prohíbase el expendio de bebidas embriagantes a menores de edad, el
          exceso de alcohol es perjudicial para la salud.
        </p>
      </div>
      <div
        className={`${inter.className} absolute bottom-0 flex flex-flow justify-center items-center text-white text-[0.8rem] md:text-sm w-full h-12`}
      >
        <p className="w-[90%] text-center">
          {year} Jabato cervecería - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
