import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function MovieButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={require('../../assets/images/movie 1.png')} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
});
