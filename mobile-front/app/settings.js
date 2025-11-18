// app/settings.js
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const isSmallScreen = SCREEN_WIDTH < 375;
  
  // États pour les paramètres
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    privateProfile: false
  });

  // Dimensions responsives
  const sectionPadding = isSmallScreen ? 16 : 20;
  const iconSize = isSmallScreen ? 20 : 22;

  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Modifier le mot de passe',
      'Un email de réinitialisation va vous être envoyé',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Envoyer', 
          onPress: () => {
            Alert.alert('Email envoyé', 'Consultez votre boîte mail');
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Supprimer le compte',
      'Cette action est irréversible. Toutes vos données seront perdues.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Compte supprimé', 'Votre compte a été supprimé avec succès');
            router.replace('/home');
          }
        }
      ]
    );
  };

  const settingsItems = [
    {
      id: 'edit-profile',
      title: 'Modifier le profil',
      subtitle: 'Nom, email, photo de profil',
      icon: 'person',
      color: '#4ECDC4',
      type: 'navigation',
      onPress: handleEditProfile
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Activer/désactiver les notifications',
      icon: 'notifications',
      color: '#FFD700',
      type: 'switch',
      value: settings.notifications,
      onPress: () => toggleSetting('notifications')
    },
    {
      id: 'privacy',
      title: 'Profil privé',
      subtitle: 'Rendre votre profil privé',
      icon: 'lock-closed',
      color: '#45B7D1',
      type: 'switch',
      value: settings.privateProfile,
      onPress: () => toggleSetting('privateProfile')
    },
    {
      id: 'password',
      title: 'Changer le mot de passe',
      subtitle: 'Mettre à jour votre mot de passe',
      icon: 'key',
      color: '#96CEB4',
      type: 'action',
      onPress: handleChangePassword
    },
    {
      id: 'delete-account',
      title: 'Supprimer le compte',
      subtitle: 'Supprimer définitivement votre compte',
      icon: 'trash',
      color: '#FF6B6B',
      type: 'destructive',
      onPress: handleDeleteAccount
    }
  ];

  const renderSettingItem = (item) => {
    const commonContent = (
      <>
        <View style={styles.settingLeft}>
          <View style={[styles.settingIcon, { backgroundColor: `${item.color}20` }]}>
            <Ionicons 
              name={item.icon} 
              size={isSmallScreen ? 18 : 20} 
              color={item.color} 
            />
          </View>
          <View style={styles.settingTexts}>
            <Text style={[
              styles.settingTitle,
              { fontSize: isSmallScreen ? 15 : 16 }
            ]}>{item.title}</Text>
            <Text style={[
              styles.settingSubtitle,
              { fontSize: isSmallScreen ? 13 : 14 }
            ]}>{item.subtitle}</Text>
          </View>
        </View>
      </>
    );

    switch (item.type) {
      case 'switch':
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.settingItem}
            onPress={item.onPress}
          >
            {commonContent}
            <Switch
              value={item.value}
              onValueChange={item.onPress}
              trackColor={{ false: '#767577', true: item.color }}
              thumbColor={item.value ? '#f4f3f4' : '#f4f3f4'}
            />
          </TouchableOpacity>
        );

      case 'navigation':
      case 'action':
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.settingItem}
            onPress={item.onPress}
          >
            {commonContent}
            <Ionicons name="chevron-forward" size={isSmallScreen ? 18 : 20} color="#666" />
          </TouchableOpacity>
        );

      case 'destructive':
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.settingItem, styles.destructiveItem]}
            onPress={item.onPress}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: `${item.color}20` }]}>
                <Ionicons 
                  name={item.icon} 
                  size={isSmallScreen ? 18 : 20} 
                  color={item.color} 
                />
              </View>
              <View style={styles.settingTexts}>
                <Text style={[
                  styles.settingTitle,
                  { 
                    fontSize: isSmallScreen ? 15 : 16,
                    color: item.color
                  }
                ]}>{item.title}</Text>
                <Text style={[
                  styles.settingSubtitle,
                  { fontSize: isSmallScreen ? 13 : 14 }
                ]}>{item.subtitle}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={isSmallScreen ? 18 : 20} color={item.color} />
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F0F" />
      
      {/* Header */}
      <View style={[
        styles.header,
        { paddingHorizontal: isSmallScreen ? 15 : 20 }
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={isSmallScreen ? 20 : 24} color="#FFD700" />
        </TouchableOpacity>
        <Text style={[
          styles.title,
          { fontSize: isSmallScreen ? 18 : 20 }
        ]}>Paramètres</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: isSmallScreen ? 15 : 20 }
        ]}
      >
        {/* Section principale */}
        <View style={[
          styles.settingsSection,
          { padding: sectionPadding }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: isSmallScreen ? 16 : 18 }
          ]}>
            Paramètres du compte
          </Text>

          {/* Items des paramètres */}
          <View style={styles.settingsList}>
            {settingsItems.map(renderSettingItem)}
          </View>
        </View>

        {/* Informations version */}
        <View style={styles.infoSection}>
          <Text style={[
            styles.infoTitle,
            { fontSize: isSmallScreen ? 14 : 16 }
          ]}>Informations</Text>
          
          <View style={styles.infoItems}>
            <View style={styles.infoItem}>
              <Text style={[
                styles.infoLabel,
                { fontSize: isSmallScreen ? 13 : 14 }
              ]}>Version</Text>
              <Text style={[
                styles.infoValue,
                { fontSize: isSmallScreen ? 13 : 14 }
              ]}>1.0.0</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={[
                styles.infoLabel,
                { fontSize: isSmallScreen ? 13 : 14 }
              ]}>Dernière connexion</Text>
              <Text style={[
                styles.infoValue,
                { fontSize: isSmallScreen ? 13 : 14 }
              ]}>Aujourd'hui, 14:30</Text>
            </View>
          </View>
        </View>

        <Text style={[
          styles.footerText,
          { fontSize: isSmallScreen ? 11 : 12 }
        ]}>
          Delegué d'Or © 2024
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
  headerPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
    paddingTop: 10,
  },
  settingsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 16,
  },
  settingsList: {
    gap: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  destructiveItem: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 107, 107, 0.2)',
    marginTop: 8,
    paddingTop: 16,
  },
  settingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTexts: {
    flex: 1,
  },
  settingTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  infoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  infoTitle: {
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
  },
  infoItems: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  infoValue: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
  },
};