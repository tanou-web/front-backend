import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Splash() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const navigateToHome = useCallback(() => {
    router.replace('/homescreen');
  }, [router]);

  useEffect(() => {
    // Animation séquence : fade in + scale
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]);

    animation.start();

    // Redirection après l'animation
    const timeout = setTimeout(() => {
      // Animation de sortie avant navigation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start(() => {
        navigateToHome();
      });
    }, 3000); // Réduit à 3s au lieu de 5s pour une meilleure UX

    return () => {
      animation.stop();
      clearTimeout(timeout);
    };
  }, [fadeAnim, scaleAnim, navigateToHome]);

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ scale: scaleAnim }],
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/logo.png')}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center', // Correction : 'alignItem' -> 'alignItems'
    flex: 1,
  },
  logo: {
    width: Math.min(SCREEN_WIDTH * 0.6, 200), 
    height: Math.min(SCREEN_WIDTH * 0.6, 200), 
    maxWidth: 200,
    maxHeight: 200,
  },
});