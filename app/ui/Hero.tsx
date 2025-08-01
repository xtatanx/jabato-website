import Image from "next/image"
import HeroImage from "@/public/hero-image.jpg"
import Button from "@/app/ui/Button"

export default function Hero(){

    const text = encodeURIComponent('Hola Jabato, me gustaría comprar cerveza')
    const whatsAppText = `https://wa.me/573112231192?text=${text}`

    return (
        <section className="relative flex flex-col items-center w-full h-150">
            <Image className="object-cover w-full  h-full" src={HeroImage} fill priority  alt="Hero Image"/>
            <div className="absolute flex justify-center bottom-15 w-[65%] md:w-[20%] max-w-[250px] h-auto">
                <Button width={'86'} height={'100'} to={whatsAppText} target='_blank' variant="primary">COMPRA JABATO</Button>
            </div>
        </section>
    )
}