import { GatsbyBrowser } from 'gatsby';
import * as React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => {
  return <ParallaxProvider>{element}</ParallaxProvider>;
};
