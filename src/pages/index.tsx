import * as React from 'react';
import type { HeadFC } from 'gatsby';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import amberCan from '../images/lata-amber.png';
import porterCan from '../images/lata-porter.png';
import seltzerCan from '../images/lata-seltzer.png';
import * as styles from './index.module.scss';
import { useParallax } from 'react-scroll-parallax';
import { ParallaxProvider } from 'react-scroll-parallax';
import ProductScores from '../components/ProductScores';
import HopIcon from '../images/hop.svg';
import {
  Bitterness,
  Carbonation,
} from '../components/ProductScores/ProductScores';

const IndexPage = () => {
  const amberParallax = useParallax({
    translateY: ['25%', '0%'],
    rootMargin: {
      top: 0,
      left: 0,
      right: 0,
      bottom: -620,
    },
    shouldAlwaysCompleteAnimation: true,
  });
  const porterParallax = useParallax({
    translateY: ['25%', '0%'],
    rootMargin: {
      top: 0,
      left: 0,
      right: 0,
      bottom: -620,
    },
    shouldAlwaysCompleteAnimation: true,
  });
  const seltzerParallax = useParallax({
    translateY: ['25%', '0%'],
    rootMargin: {
      top: 0,
      left: 0,
      right: 0,
      bottom: -620,
    },
    shouldAlwaysCompleteAnimation: true,
  });
  return (
    <ParallaxProvider>
      <Layout>
        <Hero></Hero>
        <section className={styles.mainBlock}>
          <div className={styles.container}>
            <h1 className={styles.title}>Tenemos una historia para contar</h1>
          </div>
        </section>
        <section className={styles.amberBlock}>
          <div className={styles.container}>
            <img
              className={styles.amberCan}
              src={amberCan}
              alt=""
              ref={amberParallax.ref}
            />
            <h2 className={styles.beerTitle}>Amber Ale</h2>
            <p className={styles.beerDescription}>
              Con un color ámbar, notas a caramelo y un carácter cítrico, la
              hace nuestra cerveza favorita. Tiene el perfecto balance entre el
              dulce de la malta y el amargo de los lúpulos, es muy refrescante y
              con sabroso cuerpo.
            </p>
            <ProductScores
              bitterness={Bitterness.M}
              carbonation={Carbonation.ML}
              alcohol={5.5}
            ></ProductScores>
          </div>
        </section>
        <section className={styles.porterBlock}>
          <div className={styles.container}>
            <img
              className={styles.porterCan}
              src={porterCan}
              alt=""
              ref={porterParallax.ref}
            />
            <h2 className={styles.beerTitle}>Porter</h2>
            <p className={styles.beerDescription}>
              Cerveza tipo porter con notas a caramelo, chocolate y café, le
              agregamos una adición extra de café Campo Alto(un emprendimiento,
              como nosotros) justo antes de empacarla, que le da mucha más
              fuerza a su sabor.
            </p>
            <ProductScores
              bitterness={Bitterness.M}
              carbonation={Carbonation.ML}
              alcohol={5.5}
            ></ProductScores>
          </div>
        </section>
        <section className={styles.seltzerBlock}>
          <div className={styles.container}>
            <img
              className={styles.seltzerCan}
              src={seltzerCan}
              alt=""
              ref={seltzerParallax.ref}
            />
            <h2 className={styles.beerTitle}>Seltzer</h2>
            <p className={styles.beerDescription}>
              Agua con gas, alcohol y mucho sabor. Dulce, acida, refrescante y
              con un ligero toque amargo, es una bebida elegante, algunos la
              consideran una opción saludable, nosotros solo creemos que es un
              hit!
            </p>
            <ProductScores alcohol={5.5}></ProductScores>
          </div>
        </section>
        <section className={styles.secondaryBlock}>
          <div className={styles.container}>
            <p>
              Una historia contada desde una mesa con unos amigos que comparten
              una pola, escuchando de fondo un grito que dice:
            </p>
            <HopIcon className={styles.hopIcon}></HopIcon>
            <h2>“EL PUEBLO NO SE RINDE CARAJO”</h2>
          </div>
        </section>
      </Layout>
    </ParallaxProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
