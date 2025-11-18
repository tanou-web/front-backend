import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Import de l'api - Vérifiez le chemin
import ApiService from '../services/api'; // ou '../services/api' selon votre structure

export default function Register() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 375;
  const isLargeScreen = width > 768;
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    numero: '',
    email: '',
    password: '',
    confirmPassword: '',
    universite: '',
    role: 'candidat',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  // Calcul des dimensions responsives
  const cardWidth = Math.min(width * 0.9, 500);
  const cardPadding = isSmallScreen ? 20 : 32;
  const inputHeight = isSmallScreen ? 50 : 56;
  const titleSize = isSmallScreen ? 24 : 28;
  const iconSize = isSmallScreen ? 16 : 20;

  const handleInputChange = (field, value) => {
    if (field === 'numero') {
      const numericValue = value.replace(/[^\d]/g, '');
      let formattedValue = numericValue;
      if (numericValue.length > 0) {
        formattedValue = '+226 ' + numericValue.substring(0, 2);
        if (numericValue.length > 2) {
          formattedValue += ' ' + numericValue.substring(2, 4);
        }
        if (numericValue.length > 4) {
          formattedValue += ' ' + numericValue.substring(4, 6);
        }
        if (numericValue.length > 6) {
          formattedValue += ' ' + numericValue.substring(6, 8);
        }
      }
      value = formattedValue;
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^\+226\s\d{2}(\s\d{2}){3}$/;
    return phoneRegex.test(phone);
  };

  const handleRegister = async () => {
    // Validation
    const requiredFields = ['nom', 'prenom', 'numero', 'email', 'password', 'universite', 'role'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      Alert.alert('Erreur', `Champs manquants: ${missingFields.join(', ')}`);
      return;
    }

    if (!isValidEmail(formData.email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide');
      return;
    }

    if (!isValidPhone(formData.numero)) {
      Alert.alert('Erreur', 'Veuillez entrer un numéro de téléphone valide (+226 XX XX XX XX)');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);
    try {
      // Appel vers API
      const response = await ApiService.register(formData);
      Alert.alert('Succès', response.message || 'Compte créé avec succès ! ✅');
      router.replace('/login');
    } catch (error) {
      Alert.alert('Erreur', error.message || 'Erreur lors de la création du compte ❌');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.nom && 
           formData.prenom && 
           formData.numero && 
           formData.email && 
           formData.password && 
           formData.confirmPassword &&
           formData.universite &&
           formData.role &&
           isValidEmail(formData.email) &&
           isValidPhone(formData.numero) &&
           formData.password.length >= 6 &&
           formData.password === formData.confirmPassword;
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
          keyboardShouldPersistTaps="handled"
        >
          {/* Carte principale responsive */}
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
            marginHorizontal: isSmallScreen ? 10 : 20
          }}>
            
            {/* En-tête responsive */}
            <View style={{ alignItems: 'center', marginBottom: isSmallScreen ? 20 : 32 }}>
              <View style={{
                width: isSmallScreen ? 60 : 80,
                height: isSmallScreen ? 60 : 80,
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                borderRadius: isSmallScreen ? 30 : 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: isSmallScreen ? 12 : 16,
                borderWidth: 2,
                borderColor: 'rgba(255, 215, 0, 0.3)'
              }}>
                <Ionicons name="person-add" size={isSmallScreen ? 24 : 36} color="#FFD700" />
              </View>
              <Text style={{
                fontSize: titleSize,
                fontWeight: 'bold',
                color: '#FFD700',
                textAlign: 'center',
                marginBottom: isSmallScreen ? 6 : 8
              }}>
                Créer un compte
              </Text>
              <Text style={{
                fontSize: isSmallScreen ? 14 : 16,
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
                lineHeight: isSmallScreen ? 18 : 22
              }}>
                Rejoignez la communauté Delegué d'Or
              </Text>
            </View>

            {/* Formulaire responsive */}
            <View style={{ gap: isSmallScreen ? 12 : 16 }}>
              
              {/* Nom et Prénom */}
              <View style={{ 
                flexDirection: isSmallScreen ? 'column' : 'row', 
                gap: isSmallScreen ? 12 : 12 
              }}>
                <View style={{ flex: isSmallScreen ? undefined : 1 }}>
                  <Text style={{ 
                    color: '#FFD700', 
                    marginBottom: 6, 
                    fontSize: isSmallScreen ? 13 : 14, 
                    fontWeight: '600' 
                  }}>
                    Prénom
                  </Text>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    borderWidth: 2,
                    borderColor: focusedInput === 'prenom' ? '#FFD700' : 'transparent',
                    height: inputHeight
                  }}>
                    <Ionicons 
                      name="person-outline" 
                      size={iconSize} 
                      color={focusedInput === 'prenom' ? '#FFD700' : 'rgba(255, 255, 255, 0.5)'} 
                      style={{ marginRight: 12 }}
                    />
                    <TextInput
                      placeholder="Votre prénom"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      style={{ 
                        flex: 1, 
                        color: '#FFFFFF', 
                        fontSize: isSmallScreen ? 14 : 16 
                      }}
                      value={formData.prenom}
                      onChangeText={(value) => handleInputChange('prenom', value)}
                      onFocus={() => setFocusedInput('prenom')}
                      onBlur={() => setFocusedInput(null)}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                <View style={{ flex: isSmallScreen ? undefined : 1 }}>
                  <Text style={{ 
                    color: '#FFD700', 
                    marginBottom: 6, 
                    fontSize: isSmallScreen ? 13 : 14, 
                    fontWeight: '600' 
                  }}>
                    Nom
                  </Text>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    borderWidth: 2,
                    borderColor: focusedInput === 'nom' ? '#FFD700' : 'transparent',
                    height: inputHeight
                  }}>
                    <Ionicons 
                      name="person-outline" 
                      size={iconSize} 
                      color={focusedInput === 'nom' ? '#FFD700' : 'rgba(255, 255, 255, 0.5)'} 
                      style={{ marginRight: 12 }}
                    />
                    <TextInput
                      placeholder="Votre nom"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      style={{ 
                        flex: 1, 
                        color: '#FFFFFF', 
                        fontSize: isSmallScreen ? 14 : 16 
                      }}
                      value={formData.nom}
                      onChangeText={(value) => handleInputChange('nom', value)}
                      onFocus={() => setFocusedInput('nom')}
                      onBlur={() => setFocusedInput(null)}
                      autoCapitalize="words"
                    />
                  </View>
                </View>
              </View>

              {/* Champs individuels */}
              {[
                { 
                  key: 'numero', 
                  label: 'Téléphone', 
                  icon: 'call-outline', 
                  placeholder: '+226 XX XX XX XX',
                  keyboardType: 'phone-pad'
                },
                { 
                  key: 'email', 
                  label: 'Email', 
                  icon: 'mail-outline', 
                  placeholder: 'votre@email.com',
                  keyboardType: 'email-address',
                  autoCapitalize: 'none'
                },
                { 
                  key: 'universite',
                  label: 'Université', 
                  icon: 'school-outline', 
                  placeholder: 'Votre université',
                  autoCapitalize: 'words'
                },
                { 
                  key: 'password', 
                  label: 'Mot de passe', 
                  icon: 'lock-closed-outline', 
                  placeholder: '••••••••',
                  secure: true,
                  showToggle: true,
                  autoCapitalize: 'none'
                },
                { 
                  key: 'confirmPassword', 
                  label: 'Confirmer le mot de passe', 
                  icon: 'lock-closed-outline', 
                  placeholder: '••••••••',
                  secure: true,
                  showToggle: true,
                  autoCapitalize: 'none'
                }
              ].map((field) => (
                <View key={field.key}>
                  <Text style={{ 
                    color: '#FFD700', 
                    marginBottom: 6, 
                    fontSize: isSmallScreen ? 13 : 14, 
                    fontWeight: '600' 
                  }}>
                    {field.label}
                  </Text>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    borderWidth: 2,
                    borderColor: focusedInput === field.key ? '#FFD700' : 'transparent',
                    height: inputHeight
                  }}>
                    <Ionicons 
                      name={field.icon} 
                      size={iconSize} 
                      color={focusedInput === field.key ? '#FFD700' : 'rgba(255, 255, 255, 0.5)'} 
                      style={{ marginRight: 12 }}
                    />
                    <TextInput
                      placeholder={field.placeholder}
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      style={{ 
                        flex: 1, 
                        color: '#FFFFFF', 
                        fontSize: isSmallScreen ? 14 : 16 
                      }}
                      value={formData[field.key]}
                      onChangeText={(value) => handleInputChange(field.key, value)}
                      onFocus={() => setFocusedInput(field.key)}
                      onBlur={() => setFocusedInput(null)}
                      secureTextEntry={field.secure ? (field.key === 'password' ? !showPassword : !showConfirmPassword) : false}
                      keyboardType={field.keyboardType}
                      autoCapitalize={field.autoCapitalize}
                    />
                    {field.showToggle && (
                      <TouchableOpacity 
                        onPress={() => field.key === 'password' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <Ionicons 
                          name={(field.key === 'password' ? showPassword : showConfirmPassword) ? "eye-off-outline" : "eye-outline"} 
                          size={iconSize} 
                          color="rgba(255, 255, 255, 0.5)" 
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}

              {/* Sélection du rôle */}
              <View>
                <Text style={{
                  color: '#FFD700',
                  marginBottom: 8,
                  fontSize: isSmallScreen ? 13 : 14,
                  fontWeight: '600'
                }}>
                  Rôle
                </Text>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      padding: 12,
                      backgroundColor: formData.role === 'candidat' ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: formData.role === 'candidat' ? '#FFD700' : 'transparent',
                      alignItems: 'center'
                    }}
                    onPress={() => setFormData(prev => ({ ...prev, role: 'candidat'}))}
                  >
                    <Text style={{ color: '#FFFFFF', fontSize: 14 }}>
                      Candidat
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      padding: 12,
                      backgroundColor: formData.role === 'recruteur' ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: formData.role === 'recruteur' ? '#FFD700' : 'transparent',
                      alignItems: 'center'
                    }}
                    onPress={() => setFormData(prev => ({...prev, role: 'recruteur'}))}
                  >
                    <Text style={{ color: '#FFFFFF', fontSize: 14 }}>
                      Jury
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bouton d'inscription */}
              <TouchableOpacity 
                style={{
                  backgroundColor: isFormValid() ? '#FFD700' : 'rgba(255, 215, 0, 0.3)',
                  height: inputHeight,
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: isSmallScreen ? 16 : 24,
                  shadowColor: '#FFD700',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: isFormValid() ? 0.3 : 0,
                  shadowRadius: 8,
                  elevation: 4
                }}
                onPress={handleRegister}
                disabled={!isFormValid() || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#000000" size="small" />
                ) : (
                  <>
                    <Ionicons name="person-add" size={iconSize} color="#000000" style={{ marginRight: 8 }} />
                    <Text style={{ 
                      color: '#000000', 
                      fontSize: isSmallScreen ? 14 : 16, 
                      fontWeight: 'bold' 
                    }}>
                      Créer mon compte
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Lien de connexion */}
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'center', 
                alignItems: 'center', 
                marginTop: isSmallScreen ? 16 : 24 
              }}>
                <Text style={{ 
                  color: 'rgba(255, 255, 255, 0.6)', 
                  fontSize: isSmallScreen ? 13 : 14 
                }}>
                  Déjà un compte ?{' '}
                </Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                  <Text style={{ 
                    color: '#FFD700', 
                    fontSize: isSmallScreen ? 13 : 14, 
                    fontWeight: 'bold' 
                  }}>
                    Se connecter
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