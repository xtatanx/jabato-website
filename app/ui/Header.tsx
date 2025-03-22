import Image from 'next/image'
import JabatoLogo from '@/public/jabato-logo.svg'

export default function Header(){
    return (
        <header className="fixed flex justify-center items-center bg-black w-full max-w-[100vw] h-15 z-10">
            <a href="/" className="flex justify-center">
                <Image src={JabatoLogo} width={80} height={50} alt='Jabato logo' priority/>
            </a>
        </header>
    )
}