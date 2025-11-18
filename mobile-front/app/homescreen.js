import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
    Animated,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 375;
  const isLargeScreen = width > 768;
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Dimensions responsives
  const contentPadding = isSmallScreen ? 20 : 30;
  const logoSize = isSmallScreen ? 80 : 120;
  const trophySize = isSmallScreen ? 40 : 80;
  const titleSize = isSmallScreen ? 28 : 36;
  const subtitleSize = isSmallScreen ? 14 : 16;
  const buttonHeight = isSmallScreen ? 50 : 56;
  const buttonTextSize = isSmallScreen ? 16 : 18;

  useEffect(() => {
    // Animation d'entrée
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleLogin = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      router.push('/login');
    });
  };

  const handleRegister = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      router.push('/register');
    });
  };

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [
      { translateY: slideAnim },
      { scale: scaleAnim }
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F0F" />
      
      <Animated.View style={[{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: contentPadding,
      }, animatedStyle]}>
        
        {/* Logo/Icone avec design moderne */}
        <View style={{
          width: logoSize,
          height: logoSize,
          backgroundColor: 'rgba(255, 215, 0, 0.1)',
          borderRadius: logoSize / 2,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: isSmallScreen ? 20 : 30,
          borderWidth: 2,
          borderColor: 'rgba(255, 215, 0, 0.3)',
          shadowColor: '#FFD700',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.2,
          shadowRadius: 20,
          elevation: 10,
        }}>
          <Ionicons name="trophy" size={trophySize} color="#FFD700" />
        </View>

        {/* Titre principal */}
        <Text style={{
          fontSize: titleSize,
          fontWeight: 'bold',
          color: '#FFD700',
          marginBottom: isSmallScreen ? 8 : 10,
          textAlign: 'center',
          textShadowColor: 'rgba(255, 215, 0, 0.3)',
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 15,
          lineHeight: titleSize * 1.2,
        }}>
          Delegué d'Or
        </Text>
        
        {/* Sous-titre */}
        <Text style={{
          fontSize: subtitleSize,
          color: 'rgba(255, 255, 255, 0.6)',
          marginBottom: isSmallScreen ? 40 : 60,
          textAlign: 'center',
          fontStyle: 'italic',
          lineHeight: subtitleSize * 1.4,
          paddingHorizontal: isSmallScreen ? 10 : 0,
        }}>
          L'excellence à portée de main
        </Text>

        {/* Boutons d'action */}
        <View style={{
          width: '100%',
          gap: isSmallScreen ? 12 : 16,
          maxWidth: 400,
        }}>
          
          {/* Bouton Se connecter */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFD700',
              paddingVertical: isSmallScreen ? 14 : 18,
              paddingHorizontal: isSmallScreen ? 20 : 30,
              borderRadius: 20,
              height: buttonHeight,
              shadowColor: '#FFD700',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 15,
              elevation: 8,
            }}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Ionicons name="log-in" size={isSmallScreen ? 20 : 24} color="#121212" style={{ marginRight: isSmallScreen ? 8 : 12 }} />
            <Text style={{
              fontSize: buttonTextSize,
              fontWeight: '700',
              color: '#121212',
              textAlign: 'center',
            }}>
              Se connecter
            </Text>
          </TouchableOpacity>

          {/* Bouton S'inscrire */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: '#FFD700',
              paddingVertical: isSmallScreen ? 14 : 18,
              paddingHorizontal: isSmallScreen ? 20 : 30,
              borderRadius: 20,
              height: buttonHeight,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Ionicons name="person-add" size={isSmallScreen ? 20 : 24} color="#FFD700" style={{ marginRight: isSmallScreen ? 8 : 12 }} />
            <Text style={{
              fontSize: buttonTextSize,
              fontWeight: '700',
              color: '#FFD700',
              textAlign: 'center',
            }}>
              S'inscrire
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={{
          position: 'absolute',
          bottom: isSmallScreen ? 30 : 40,
          alignItems: 'center',
        }}>
          <Text style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: isSmallScreen ? 11 : 12,
          }}>
            Version 1.0.0
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}