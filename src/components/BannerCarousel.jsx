import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { LogBox } from 'react-native';

const BannerCarousel = () => {
  const BannerWidth = Dimensions.get('window').width;
  const BannerHeight = 160;

  const images = [
    require('../../assets/images/Banner.webp'),
    require('../../assets/images/Banner-1.webp'),
    require('../../assets/images/Banner-2.webp'),
    require('../../assets/images/Banner-3.webp'),
  ];

  useEffect(() => {
    // Oculta la advertencia específica sobre `useNativeDriver`
    LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);
  }, []);

  return (
    <View style={styles.container}>
      <Carousel
        autoplay
        autoplayTimeout={5000}
        loop
        index={0}
        pageSize={BannerWidth}
        pageIndicatorContainerStyle={{ display: 'none' }}  // Intenta ocultar los puntos indicadores
      >
        {images.map((image, index) => (
          <View key={index}>
            <Image
              style={{ width: BannerWidth, height: BannerHeight }}
              source={image}
            />
          </View>
        ))}
      </Carousel>
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
