// app/profile.js
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const isSmallScreen = SCREEN_WIDTH < 375;
  const isTablet = SCREEN_WIDTH > 768;
  
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Dimensions responsives
  const profileImageSize = isSmallScreen ? 70 : isTablet ? 100 : 80;
  const statIconSize = isSmallScreen ? 35 : 40;
  const menuIconSize = isSmallScreen ? 35 : 40;
  const sectionPadding = isSmallScreen ? 16 : 20;

  const userStats = [
    { label: 'Votes donnés', value: '24', icon: 'heart' },
    { label: 'Candidats suivis', value: '8', icon: 'people' },
    { label: 'Badges', value: '3', icon: 'ribbon' },
  ];

  const menuItems = [
    {
      title: 'Mes votes',
      icon: 'heart',
      color: '#FF6B6B',
      onPress: () => router.push('/my-votes')
    },
    {
      title: 'Favoris',
      icon: 'star',
      color: '#FFD700',
      onPress: () => router.push('/favorites')
    },
    {
      title: 'Paramètres',
      icon: 'settings',
      color: '#4ECDC4',
      onPress: () => router.push('/settings')
    },
    {
      title: 'Aide & Support',
      icon: 'help-circle',
      color: '#45B7D1',
      onPress: () => router.push('/help')
    },
    {
      title: 'À propos',
      icon: 'information',
      color: '#96CEB4',
      onPress: () => router.push('/about')
    },
  ];

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
        ]}>Profil</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={isSmallScreen ? 18 : 20} color="#FFD700" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: isSmallScreen ? 15 : 20 }
        ]}
      >
        {/* Section profil */}
        <View style={[
          styles.profileSection,
          { padding: sectionPadding }
        ]}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face' }} 
            style={[
              styles.profileImage,
              { 
                width: profileImageSize, 
                height: profileImageSize 
              }
            ]} 
          />
          
          <View style={styles.profileInfo}>
            <Text style={[
              styles.profileName,
              { fontSize: isSmallScreen ? 18 : 20 }
            ]}>Jean Dupont</Text>
            <Text style={[
              styles.profileEmail,
              { fontSize: isSmallScreen ? 13 : 14 }
            ]}>jean.dupont@email.com</Text>
            <Text style={[
              styles.profileLocation,
              { fontSize: isSmallScreen ? 11 : 12 }
            ]}>
              <Ionicons name="location" size={isSmallScreen ? 12 : 14} color="#FFD700" />
              Abidjan, Côte d'Ivoire
            </Text>
          </View>
        </View>

        {/* Statistiques */}
        <View style={[
          styles.statsSection,
          { 
            padding: sectionPadding,
            flexDirection: isSmallScreen ? 'column' : 'row'
          }
        ]}>
          {userStats.map((stat, index) => (
            <View 
              key={index} 
              style={[
                styles.statItem,
                isSmallScreen && { 
                  flexDirection: 'row', 
                  justifyContent: 'flex-start',
                  width: '100%',
                  marginBottom: isSmallScreen ? 12 : 0
                }
              ]}
            >
              <View style={[
                styles.statIcon, 
                { 
                  backgroundColor: `${stat.color}20`,
                  width: statIconSize,
                  height: statIconSize
                }
              ]}>
                <Ionicons 
                  name={stat.icon} 
                  size={isSmallScreen ? 16 : 20} 
                  color={stat.color} 
                />
              </View>
              <View style={isSmallScreen ? styles.statTextContainer : null}>
                <Text style={[
                  styles.statValue,
                  { fontSize: isSmallScreen ? 16 : 18 }
                ]}>{stat.value}</Text>
                <Text style={[
                  styles.statLabel,
                  { fontSize: isSmallScreen ? 11 : 12 }
                ]}>{stat.label}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Paramètres rapides */}
        <View style={[
          styles.settingsSection,
          { padding: sectionPadding }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: isSmallScreen ? 16 : 18 }
          ]}>Préférences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons 
                name="notifications" 
                size={isSmallScreen ? 20 : 22} 
                color="#4ECDC4" 
              />
              <Text style={[
                styles.settingText,
                { fontSize: isSmallScreen ? 15 : 16 }
              ]}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#4ECDC4' }}
              thumbColor={notifications ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons 
                name="moon" 
                size={isSmallScreen ? 20 : 22} 
                color="#FFD700" 
              />
              <Text style={[
                styles.settingText,
                { fontSize: isSmallScreen ? 15 : 16 }
              ]}>Mode sombre</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#FFD700' }}
              thumbColor={darkMode ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Menu */}
        <View style={[
          styles.menuSection,
          { padding: sectionPadding }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: isSmallScreen ? 16 : 18 }
          ]}>Mon Compte</Text>
          
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuLeft}>
                <View style={[
                  styles.menuIcon, 
                  { 
                    backgroundColor: `${item.color}20`,
                    width: menuIconSize,
                    height: menuIconSize
                  }
                ]}>
                  <Ionicons 
                    name={item.icon} 
                    size={isSmallScreen ? 18 : 20} 
                    color={item.color} 
                  />
                </View>
                <Text style={[
                  styles.menuText,
                  { fontSize: isSmallScreen ? 15 : 16 }
                ]}>{item.title}</Text>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={isSmallScreen ? 18 : 20} 
                color="#666" 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bouton de déconnexion */}
        <TouchableOpacity style={[
          styles.logoutButton,
          { padding: isSmallScreen ? 14 : 16 }
        ]}>
          <Ionicons 
            name="log-out" 
            size={isSmallScreen ? 18 : 20} 
            color="#FF6B6B" 
          />
          <Text style={[
            styles.logoutText,
            { fontSize: isSmallScreen ? 15 : 16 }
          ]}>Déconnexion</Text>
        </TouchableOpacity>

        <Text style={[
          styles.versionText,
          { fontSize: isSmallScreen ? 11 : 12 }
        ]}>Version 1.0.0</Text>
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
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  profileImage: {
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 6,
  },
  profileLocation: {
    color: '#FFD700',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statsSection: {
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statTextContainer: {
    marginLeft: 12,
    alignItems: 'flex-start',
  },
  statIcon: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
  settingsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    color: '#FFFFFF',
  },
  menuSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: '#FFFFFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    gap: 8,
    marginBottom: 16,
  },
  logoutText: {
    fontWeight: '600',
    color: '#FF6B6B',
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
  },
};