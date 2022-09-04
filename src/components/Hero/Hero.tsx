import * as React from 'react';
import * as styles from './hero.module.scss';
import { StaticImage } from 'gatsby-plugin-image';
import Button from '../Button';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <StaticImage
        className={styles.heroImage}
        src="../../images/hero-image.jpg"
        alt=""
        loading="eager"
      ></StaticImage>
      <div className={styles.heroContainer}>
        <Button>COMPRAR JABATO</Button>
      </div>
    </section>
  );
};

export default Hero;
