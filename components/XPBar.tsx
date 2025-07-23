import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

interface ExpBarProps {
  level: number;               // 0.0 to 1.0
  triggerAnimation: boolean;
  currentXP?: number;          // optional for animation display
  maxXP?: number;              // optional for animation display
}

const ExpBar = ({ level, triggerAnimation, currentXP = 300, maxXP = 500 }: ExpBarProps) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const numberAnim = useRef(new Animated.Value(0)).current;
  const [displayXP, setDisplayXP] = useState(0);

  useEffect(() => {
    if (triggerAnimation) {
      widthAnim.setValue(0);
      numberAnim.setValue(0);

      Animated.timing(widthAnim, {
        toValue: level * 100,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      Animated.timing(numberAnim, {
        toValue: currentXP,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [triggerAnimation]);

  useEffect(() => {
    const listener = numberAnim.addListener(({ value }) => {
      setDisplayXP(Math.floor(value));
    });

    return () => numberAnim.removeListener(listener);
  }, []);

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.barContainer}>
        <Animated.View
          style={[
            styles.barFill,
            {
              width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      <Text style={styles.xpText}>XP: {displayXP} / {maxXP}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    width: 200,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#374151',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#EC4899',
    borderRadius: 10,
  },
  xpText: {
    marginTop: 5,
    fontSize: 12,
    color: '#D1D5DB',
  },
});

export default ExpBar;
