import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const BannerCarousel = () => {
  const BannerWidth = Dimensions.get('window').width;
  const BannerHeight = 160;

  const images = [
    require('../../assets/images/Banner.webp'),
    require('../../assets/images/Banner-1.webp'),
    require('../../assets/images/Banner-2.webp'),
    require('../../assets/images/Banner-3.webp'),
  ];

  const swiperRef = useRef(null);

  useEffect(() => {
    const autoplayTimer = setInterval(() => {
      // Cambia a la siguiente imagen cada 5 segundos
      if (swiperRef.current) {
        swiperRef.current.scrollBy(1);
      }
    }, 5000);

    return () => {
      clearInterval(autoplayTimer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        autoplay
        autoplayTimeout={5000}
        loop
        index={0}
        paginationStyle={{ display: 'none' }}
      >
        {images.map((image, index) => (
          <View key={index}>
            <Image style={{ width: BannerWidth, height: BannerHeight }} source={image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BannerCarousel;
