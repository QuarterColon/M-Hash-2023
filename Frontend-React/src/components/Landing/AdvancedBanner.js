import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';
// import RocketAnimation from './RocketAnimation';

import landingImg from '../../assets/images/landing.png'
import bg from '../../assets/images/bg.png'

export const AdvancedBannerTop = () => {
  const background = {
    image:
      bg,
    translateY: [0, 50],
    opacity: [1, 0.3],
    scale: [1.05, 1, 'easeOutCubic'],
    shouldAlwaysCompleteAnimation: true,
  };

  const headline = {
    translateY: [-20, 50],
    scale: [1, 1.25, 'easeOutCubic'],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="inset center">
        <h1 className="headline white">ACUMEN</h1>
      </div>
    ),
  };

  const foreground = {
    image: landingImg,
    translateY: [8, 0],
    scale: [0.5,1.2, 'easeOutCubic'],
    shouldAlwaysCompleteAnimation: true,
  };

  const gradientOverlay = {
    opacity: [0, 1, 'easeOutCubic'],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: <div className="gradient inset" />,
  };

  return (
    <ParallaxBanner layers={[background, headline, foreground, gradientOverlay]} className="full" />
  );
};
