import * as React from 'react';
import * as styles from './index.module.scss';
import type { HeadFC } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import { useParallax } from 'react-scroll-parallax';
import { ParallaxProvider } from 'react-scroll-parallax';
import ProductScores from '../components/ProductScores';
import HopIcon from '../images/hop.svg';
import {
  Bitterness,
  Carbonation,
} from '../components/ProductScores/ProductScores';
import Button from '../components/Button';

const IndexPage = () => {
  const tangerineParallax = useParallax({
    speed: 20,
  });

  const amberParallax = useParallax({
    speed: 15,
  });

  const caramelParallax = useParallax({
    speed: 10,
  });

  const coffeeParallax = useParallax({
    speed: 20,
  });

  const porterParallax = useParallax({
    speed: 15,
  });

  const caramelParallax2 = useParallax({
    speed: 10,
  });

  const coffeeParallax2 = useParallax({
    speed: 20,
  });

  const porterParallax2 = useParallax({
    speed: 15,
  });

  const caramelParallax3 = useParallax({
    speed: 10,
  });

  const lemonParallax = useParallax({
    speed: 20,
  });

  const seltzerParallax = useParallax({
    speed: 15,
  });

  const watermelonParallax = useParallax({
    speed: 10,
  });

  const getWhatsAppLink = (type: string) => {
    const beers = ['Porter', 'Amber'];
    let text = '';
    if (beers.includes(type)) {
      text = encodeURI(`Hola Jabato, me gustaría comprar cerveza ${type}`);
    } else {
      text = encodeURI(`Hola Jabato, me gustaría comprar ${type}`);
    }

    return `https://wa.me/573027366778?text=${text}`;
  };

  return (
    <ParallaxProvider>
      <Layout>
        <Hero></Hero>
        <section className={styles.mainBlock}>
          <div className={styles.container}>
            <h1 className={styles.title}>Cervezas con carácter</h1>
          </div>
        </section>
        <section className={styles.amberBlock}>
          <div className={styles.amberBg}>
            <div className={styles.amberBgLeft}></div>
            <div className={styles.amberBgRight}></div>
          </div>
          <div className={styles.beerContainer}>
            <div ref={amberParallax.ref} className={styles.amberCan}>
              <StaticImage
                src="../images/lata-amber.png"
                alt="Lata de cerveza Amber Ale"
                layout="fullWidth"
                placeholder="blurred"
                quality={100}
              />
            </div>
            <div className={styles.beerContent}>
              <h2 className={styles.beerTitle}>Amber Ale</h2>
              <p className={styles.beerDescription}>
                Con un color ámbar, notas a caramelo y un carácter cítrico, la
                hace nuestra cerveza favorita. Tiene el perfecto balance entre
                el dulce de la malta y el amargo de los lúpulos, es muy
                refrescante y con sabroso cuerpo.
              </p>
              <div className={styles.productScores}>
                <ProductScores
                  bitterness={Bitterness.M}
                  carbonation={Carbonation.ML}
                  alcohol={5.5}
                ></ProductScores>
              </div>
              <Button variant="ghost" to={getWhatsAppLink('Amber')}>
                Comprar
              </Button>
            </div>
            <div ref={caramelParallax.ref} className={styles.caramel}>
              <StaticImage
                src="../images/i-caramel.png"
                alt=""
                layout="fullWidth"
                placeholder="blurred"
                quality={100}
              />
            </div>
            <div ref={tangerineParallax.ref} className={styles.tangerine}>
              <StaticImage
                src="../images/i-tangerine.png"
                alt=""
                layout="fullWidth"
                placeholder="blurred"
                quality={100}
              />
            </div>
          </div>
        </section>
        <section className={styles.porterBlock}>
          <div className={styles.porterBg}>
            <div className={styles.porterBgLeft}></div>
            <div className={styles.porterBgRight}></div>
          </div>
          <div className={styles.beerContainer}>
            <div ref={porterParallax.ref} className={styles.porterCan}>
              <StaticImage
                src="../images/lata-porter.png"
                alt="Lata de cerveza Porter"
                layout="fullWidth"
                placeholder="blurred"
                quality={100}
              />
            </div>
            <div className={styles.beerContent}>
              <h2 className={styles.beerTitle}>Porter</h2>
              <p className={styles.beerDescription}>
                Cerveza tipo porter con notas a caramelo, chocolate y café, le
                agregamos una adición extra de café Campo Alto(un
                emprendimiento, como nosotros) justo antes de empacarla, que le
                da mucha más fuerza a su sabor.
              </p>
              <div className={styles.productScores}>
                <ProductScores
                  bitterness={Bitterness.M}
                  carbonation={Carbonation.ML}
                  alcohol={5.5}
                ></ProductScores>
              </div>
              <Button variant="ghost" to={getWhatsAppLink('Porter')}>
                Comprar
              </Button>
            </div>
            <div ref={coffeeParallax.ref} className={styles.coffee}>
              <StaticImage
                src="../images/i-coffee.png"
                alt=""
                layout="fullWidth"
                placeholder="blurred"
                quality={100}
              />
            </div>
            <div ref={caramelParallax2.ref} className={styles.caramel2}>
              <StaticImage
                src="../images/i-caramel.png"
                alt=""
                layout="fullWidth"
                placeholder="blurred"
                quality={100}
              />
            </div>
          </div>
        </section>
        <section className={styles.porterBlock2}>
          <div className={styles.porterBg}>
            <div className={styles.porterBgRight}></div>
            <div className={styles.porterBgLeft}></div>
          </div>
          <div className={styles.beerContainer}>
            <div className={styles.beerContent2}>
              <h2 className={styles.beerTitle}>Porter</h2>
              <p className={styles.beerDescription}>
                Cerveza tipo porter con notas a caramelo, chocolate y café, le
                agregamos una adición extra de café Campo Alto(un
                emprendimiento, como nosotros) justo antes de empacarla, que le
                da mucha más fuerza a su sabor.
              </p>
              <div className={styles.productScores}>
                <ProductScores
                  bitterness={Bitterness.M}
                  carbonation={Carbonation.ML}
                  alcohol={5.5}
                ></ProductScores>
              </div>
              <Button variant="ghost" to={getWhatsAppLink('Porter')}>
                Comprar
              </Button>
            </div>
            <div ref={porterParallax2.ref} className={styles.porterCan}>
              <StaticImage
                src="../images/lata-porter.png"
                alt="Lata de cerveza Porter"
                layout="fullWidth"
                placeholder="blurred"
                quality={100}
              />
            </div>
            <div ref={coffeeParallax2.ref} className={styles.coffee}>
              <StaticImage
                src="../images/i-coffee.png"
                alt=""
                layout="fullWidth"
                placeholder="blurred"
                quality={100}
              />
            </div>
            <div ref={caramelParallax3.ref} className={styles.caramel2}>
              <StaticImage
                src="../images/i-caramel.png"
                alt=""
                layout="fullWidth"
                placeholder="blurred"
                quality={100}
              />
            </div>
          </div>
        </section>
        <section className={styles.seltzerBlock}>
          <div className={styles.seltzerBg}>
            <div className={styles.seltzerBgLeft}></div>
            <div className={styles.seltzerBgRight}></div>
          </div>
          <div className={styles.beerContainer}>
            <div ref={seltzerParallax.ref} className={styles.seltzerCan}>
              <StaticImage
                src="../images/lata-seltzer.png"
                alt="Lata de Hardseltzer de limon y sandia"
                layout="fullWidth"
                placeholder="blurred"
                quality={100}
              />
            </div>
            <div className={styles.beerContent}>
              <h2 className={styles.beerTitle}>Seltzer</h2>
              <p className={styles.beerDescription}>
                Agua con gas, alcohol y mucho sabor. Dulce, acida, refrescante y
                con un ligero toque amargo, es una bebida elegante, algunos la
                consideran una opción saludable, nosotros solo creemos que es un
                hit!
              </p>
              <div className={styles.productScores}>
                <ProductScores alcohol={5.5}></ProductScores>
              </div>
              <Button variant="ghost" to={getWhatsAppLink('Seltzer')}>
                Comprar
              </Button>
            </div>
            <div ref={lemonParallax.ref} className={styles.lemon}>
              <StaticImage
                src="../images/i-lemon.png"
                alt=""
                layout="fullWidth"
                placeholder="blurred"
                quality={100}
              />
            </div>
            <div ref={watermelonParallax.ref} className={styles.watermelon}>
              <StaticImage
                src="../images/i-watermelon.png"
                alt=""
                layout="fullWidth"
                placeholder="blurred"
                quality={100}
              />
            </div>
          </div>
        </section>
        <section className={styles.secondaryBlock}>
          <div className={styles.container}>
            <div className={styles.secondaryContent}>
              <p>
                Somos los luchadores, los que damos el salto al vacío, los que
                aun cuando tenemos miedo lo intentamos
              </p>
              <HopIcon className={styles.hopIcon}></HopIcon>
              <h2>Somos grandes, desde pequeños</h2>
            </div>
          </div>
        </section>
      </Layout>
    </ParallaxProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Jabato Cerveceria | Cervezas con carácter</title>
    <meta
      name="description"
      content="Cervezas artesanales con carácter. Ven y averigua porque somos la cervecería que nació grande desde pequeña."
    />
  </>
);
