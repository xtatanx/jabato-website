'use client'
import {inter} from '@/app/ui/fonts'
import Image from 'next/image';
import Logo from '@/public/jabato-logo.svg'
import Button from '@/app/ui/Button';
import { useEffect, useState } from 'react';

const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(row => row.startsWith(`${name}`));
    return cookie ? cookie.split('=')[1] : null;
}

export default function Layer(){

    const [active, setActive] = useState<'fixed' | 'hidden' | null>(null);

    useEffect(() => {
         const userChoise = getCookie('userChoice');
         if(userChoise === 'yes') {
             setActive('hidden');
         }else{
            setActive('fixed');
         }
     }, []);
     
     const handleYesClick = () => {
         document.cookie = "userChoice=yes; path=/; max-age=31536000";
         setActive('hidden');
     };
     
     const handleNoClick = () => {
         document.cookie = "userChoice=no; path=/; max-age=31536000";
         alert('Lo siento, no puedes ingresar a esta página');
         window.location.href='http://google.com';
     };

    if(active === null ) return null;
 
    return (
        <aside className={`${active} flex justify-center items-center z-5 bg-black/70 w-[100%] md:w-[100%] h-[100vh]`}>
            <div className="relative flex flex-col justify-evenly items-center w-[70%] md:w-[40%] h-[40%] md:h-[60%] rounded-3xl bg-brandgray bg-[url(/pattern.png)]">
                <Image className="w-[134px] md:w-[200px] md:h-[80px] h-[60px]" src={Logo} width={234} height={234} alt="Logo Jabato" />
                <h1 className={`${inter.className} text-white font-extrabold text-[1.8rem] md:text-[2rem] w-[90%] text-center`}>¿Tienes 18 años o más?</h1>
                <div className="flex flex-row justify-evenly items-center w-[70%] h-[20%]">
                    <Button width={'35'} height={40} onClick={handleNoClick} target='_self' variant='primary'>NO</Button>
                    <Button width={'35'} height={40} onClick={handleYesClick} target='_self' variant='primary'>SI</Button>
                </div> 
            </div>
        </aside>
    )
};