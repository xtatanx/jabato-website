import * as React from 'react';
import * as styles from './hero.module.scss';
import { StaticImage } from 'gatsby-plugin-image';
import Button from '../Button';

const Hero = () => {
  const text = encodeURI(`Hola Jabato, me gustaría comprar cerveza`);
  const whatsAppText = `https://wa.me/573027366778?text=${text}`;

  return (
    <section className={styles.hero}>
      <StaticImage
        className={styles.heroImage}
        src="../../images/hero-image.jpg"
        alt=""
        loading="eager"
        layout="fullWidth"
        placeholder="blurred"
        quality={100}
      ></StaticImage>
      <div className={styles.heroContainer}>
        <Button to={whatsAppText}>COMPRAR JABATO</Button>
      </div>
    </section>
  );
};

export default Hero;
