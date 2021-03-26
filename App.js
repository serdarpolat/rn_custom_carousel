import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('screen');

const data = [
  'https://images.wallpaperscraft.com/image/astronaut_spacesuit_earth_177755_1366x768.jpg',
  'https://images.wallpaperscraft.com/image/deer_art_vector_134088_1366x768.jpg',
  'https://images.wallpaperscraft.com/image/tree_planet_stars_galaxy_art_117068_1366x768.jpg',
  'https://images.wallpaperscraft.com/image/tree_stars_glow_147385_1366x768.jpg',
  'https://images.wallpaperscraft.com/image/cat_art_tree_vector_118866_1366x768.jpg',
  'https://images.wallpaperscraft.com/image/bear_drawing_animal_87247_1366x768.jpg',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200'

];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ]

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0]
          })

          return <Animated.Image
            key={`image-${index}`}
            source={{ uri: image }}
            style={[
              StyleSheet.absoluteFillObject,
              {
                opacity
              }
            ]}
            blurRadius={10}
          />
        })}
      </View>
      <Animated.FlatList
        data={data}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={({ item }) => {
          return <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: item }} style={{
              width: imageW,
              height: imageH,
              resizeMode: 'cover',
              borderRadius: 16
            }} />
          </View>
        }}
      />
    </View>
  );
};