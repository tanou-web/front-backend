import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from "react-native";

import ApiService from '../services/api';


export default function Login() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 375;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  // Dimensions responsives
  const cardWidth = Math.min(width * 0.9, 450);
  const cardPadding = isSmallScreen ? 24 : 32;
  const inputHeight = isSmallScreen ? 50 : 56;
  const titleSize = isSmallScreen ? 26 : 32;
  const iconSize = isSmallScreen ? 18 : 20;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide');
      return;
    }

    setIsLoading(true);
    
    try {
      //appel a l api php
      const response = await ApiService.login(email,password);

      Alert.alert('Succès', response.message || 'Connexion Reussie !')
      //await new Promise(resolve => setTimeout(resolve, 1500));

      router.replace('/home');
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = () => {
    Alert.alert('Mot de passe oublié', 'Fonctionnalité à venir');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={{ 
            flexGrow: 1,
            minHeight: height,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: isSmallScreen ? 10 : 20
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Carte principale avec design moderne */}
          <View style={{
            width: cardWidth,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 24,
            padding: cardPadding,
            borderWidth: 1,
            borderColor: 'rgba(255, 215, 0, 0.1)',
            shadowColor: '#FFD700',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 30,
            elevation: 10,
          }}>
            
            {/* En-tête avec icône */}
            <View style={{ alignItems: 'center', marginBottom: isSmallScreen ? 24 : 32 }}>
              <View style={{
                width: isSmallScreen ? 70 : 80,
                height: isSmallScreen ? 70 : 80,
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                borderRadius: isSmallScreen ? 35 : 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: isSmallScreen ? 16 : 20,
                borderWidth: 2,
                borderColor: 'rgba(255, 215, 0, 0.3)'
              }}>
                <Ionicons name="log-in" size={isSmallScreen ? 30 : 36} color="#FFD700" />
              </View>
              
              <Text style={{
                fontSize: titleSize,
                fontWeight: 'bold',
                color: '#FFD700',
                textAlign: 'center',
                marginBottom: isSmallScreen ? 8 : 12
              }}>
                Connexion
              </Text>
              
              <Text style={{
                fontSize: isSmallScreen ? 14 : 16,
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center'
              }}>
                Content de vous revoir !
              </Text>
            </View>

            {/* Formulaire */}
            <View style={{ gap: isSmallScreen ? 16 : 20 }}>

              {/* Champ Email */}
              <View>
                <Text style={{ 
                  color: '#FFD700', 
                  marginBottom: 8, 
                  fontSize: isSmallScreen ? 14 : 15, 
                  fontWeight: '600' 
                }}>
                  Email
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  borderWidth: 2,
                  borderColor: focusedInput === 'email' ? '#FFD700' : 'transparent',
                  height: inputHeight
                }}>
                  <Ionicons 
                    name="mail-outline" 
                    size={iconSize} 
                    color={focusedInput === 'email' ? '#FFD700' : 'rgba(255, 255, 255, 0.5)'} 
                    style={{ marginRight: 12 }}
                  />
                  <TextInput
                    placeholder="votre@email.com"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    style={{ 
                      flex: 1, 
                      color: '#FFFFFF', 
                      fontSize: isSmallScreen ? 15 : 16 
                    }}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
              </View>

              {/* Champ Mot de passe */}
              <View>
                <Text style={{ 
                  color: '#FFD700', 
                  marginBottom: 8, 
                  fontSize: isSmallScreen ? 14 : 15, 
                  fontWeight: '600' 
                }}>
                  Mot de passe
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  borderWidth: 2,
                  borderColor: focusedInput === 'password' ? '#FFD700' : 'transparent',
                  height: inputHeight
                }}>
                  <Ionicons 
                    name="lock-closed-outline" 
                    size={iconSize} 
                    color={focusedInput === 'password' ? '#FFD700' : 'rgba(255, 255, 255, 0.5)'} 
                    style={{ marginRight: 12 }}
                  />
                  <TextInput
                    placeholder="••••••••"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    style={{ 
                      flex: 1, 
                      color: '#FFFFFF', 
                      fontSize: isSmallScreen ? 15 : 16 
                    }}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={iconSize} 
                      color="rgba(255, 255, 255, 0.5)" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Mot de passe oublié */}
              <TouchableOpacity 
                style={{ alignSelf: 'flex-end' }}
                onPress={handleForgotPassword}
              >
                <Text style={{ 
                  color: '#FFD700', 
                  fontSize: isSmallScreen ? 13 : 14 
                }}>
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>

              {/* Bouton de connexion */}
              <TouchableOpacity 
                style={{
                  backgroundColor: (email && password) ? '#FFD700' : 'rgba(255, 215, 0, 0.3)',
                  height: inputHeight,
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: isSmallScreen ? 8 : 12,
                  shadowColor: '#FFD700',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: (email && password) ? 0.3 : 0,
                  shadowRadius: 8,
                  elevation: 4
                }}
                onPress={handleLogin}
                disabled={!email || !password || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#000000" size="small" />
                ) : (
                  <>
                    <Ionicons name="log-in" size={iconSize} color="#000000" style={{ marginRight: 10 }} />
                    <Text style={{ 
                      color: '#000000', 
                      fontSize: isSmallScreen ? 16 : 18, 
                      fontWeight: '600' 
                    }}>
                      Se connecter
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Séparateur */}
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                marginVertical: isSmallScreen ? 20 : 25 
              }}>
                <View style={{ 
                  flex: 1, 
                  height: 1, 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)' 
                }} />
                <Text style={{ 
                  color: 'rgba(255, 255, 255, 0.5)', 
                  marginHorizontal: 15, 
                  fontSize: isSmallScreen ? 13 : 14 
                }}>
                  Ou
                </Text>
                <View style={{ 
                  flex: 1, 
                  height: 1, 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)' 
                }} />
              </View>

              {/* Lien vers l'inscription */}
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}>
                <Text style={{ 
                  color: 'rgba(255, 255, 255, 0.6)', 
                  fontSize: isSmallScreen ? 14 : 15 
                }}>
                  Vous n'avez pas de compte ?{' '}
                </Text>
                <TouchableOpacity onPress={() => router.push('/register')}>
                  <Text style={{ 
                    color: '#FFD700', 
                    fontSize: isSmallScreen ? 14 : 15, 
                    fontWeight: '600' 
                  }}>
                    S'inscrire
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}