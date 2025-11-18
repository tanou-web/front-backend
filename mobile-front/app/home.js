// app/home.js
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const isSmallScreen = SCREEN_WIDTH < 375;
  const isTablet = SCREEN_WIDTH > 768;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('1');
  const flatListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Dimensions responsives
  const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - (isSmallScreen ? 30 : 40);
  const itemWidth = (SCREEN_WIDTH - (isSmallScreen ? 40 : 60)) / 3;
  const carouselImageSize = isSmallScreen ? 100 : isTablet ? 150 : 120;
  const winnerImageSize = isSmallScreen ? 60 : 70;

  // Données des vainqueurs
  const winners = [
    { 
      id: '1', 
      name: 'Alice Konan', 
      year: '2024',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      votes: '15,234'
    },
    { 
      id: '2', 
      name: 'Bob Traoré', 
      year: '2023',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      votes: '14,876'
    },
    { 
      id: '3', 
      name: 'Charlie Diarra', 
      year: '2022',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      votes: '13,542'
    },
    { 
      id: '4', 
      name: 'Diana Bamba', 
      year: '2021',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      votes: '12,987'
    },
    { 
      id: '5', 
      name: 'Eric Kouassi', 
      year: '2020',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      votes: '12,543'
    },
    { 
      id: '6', 
      name: 'Fatou Diallo', 
      year: '2019',
      photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
      votes: '11,876'
    },
  ];

  const bottomTabs = [
    { id: '1', title: 'Accueil', icon: 'home', route: '/home' },
    { id: '2', title: 'Voter', icon: 'heart', route: '/vote' },
    { id: '3', title: 'Candidats', icon: 'people', route: '/candidates' },
    { id: '4', title: 'Classement', icon: 'trophy', route: '/ranking' },
    { id: '5', title: 'Profil', icon: 'person', route: '/profile' },
  ];

  // Animation d'entrée
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  // Gestion du scroll automatique
  const handleScrollToIndexFailed = (info) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ 
        index: info.index, 
        animated: true 
      });
    });
  };

  const getItemLayout = (data, index) => ({
    length: CAROUSEL_ITEM_WIDTH,
    offset: CAROUSEL_ITEM_WIDTH * index,
    index,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % winners.length;
      setCurrentIndex(nextIndex);
      
      flatListRef.current?.scrollToIndex({ 
        index: nextIndex, 
        animated: true 
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleTabPress = (tab) => {
    setActiveTab(tab.id);
    if (tab.route) {
      router.push(tab.route);
    }
  };

  const renderCarouselItem = ({ item }) => (
    <View style={[styles.carouselItem, { width: CAROUSEL_ITEM_WIDTH }]}>
      <View style={styles.crownContainer}>
        <Ionicons name="trophy" size={isSmallScreen ? 24 : 28} color="#FFD700" />
      </View>
      <Image 
        source={{ uri: item.photo }} 
        style={[styles.carouselImage, { 
          width: carouselImageSize, 
          height: carouselImageSize 
        }]} 
      />
      <View style={styles.carouselInfo}>
        <Text style={[
          styles.carouselName,
          { fontSize: isSmallScreen ? 18 : 20 }
        ]}>{item.name}</Text>
        <Text style={[
          styles.carouselYear,
          { fontSize: isSmallScreen ? 13 : 14 }
        ]}>Vainqueur {item.year}</Text>
        <View style={styles.votesContainer}>
          <Ionicons name="heart" size={isSmallScreen ? 14 : 16} color="#FF6B6B" />
          <Text style={[
            styles.votesText,
            { fontSize: isSmallScreen ? 11 : 12 }
          ]}>{item.votes} votes</Text>
        </View>
      </View>
    </View>
  );

  const groupWinnersByRow = (data, itemsPerRow) => {
    const grouped = [];
    for (let i = 0; i < data.length; i += itemsPerRow) {
      grouped.push(data.slice(i, i + itemsPerRow));
    }
    return grouped;
  };

  const renderWinnerRow = ({ item: row }) => (
    <View style={styles.winnerRow}>
      {row.map((winner) => (
        <TouchableOpacity 
          key={winner.id} 
          style={[styles.winnerItem, { width: itemWidth }]}
        >
          <Image 
            source={{ uri: winner.photo }} 
            style={[
              styles.winnerImage, 
              { 
                width: winnerImageSize, 
                height: winnerImageSize 
              }
            ]} 
          />
          <View style={styles.winnerInfo}>
            <Text style={[
              styles.winnerName,
              { fontSize: isSmallScreen ? 11 : 12 }
            ]} numberOfLines={1}>{winner.name}</Text>
            <Text style={[
              styles.winnerYear,
              { fontSize: isSmallScreen ? 10 : 11 }
            ]}>{winner.year}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {row.length < 3 && Array(3 - row.length).fill().map((_, index) => (
        <View key={`empty-${index}`} style={[styles.winnerItem, { width: itemWidth, opacity: 0 }]} />
      ))}
    </View>
  );

  const groupedWinners = groupWinnersByRow(winners, 3);

  const renderBottomTab = (tab) => (
    <TouchableOpacity
      key={tab.id}
      style={[
        styles.tabButton,
        activeTab === tab.id && styles.tabButtonActive
      ]}
      onPress={() => handleTabPress(tab)}
    >
      <Ionicons 
        name={tab.icon} 
        size={isSmallScreen ? 22 : 24} 
        color={activeTab === tab.id ? '#FFD700' : '#888'} 
      />
      <Text style={[
        styles.tabText,
        { fontSize: isSmallScreen ? 9 : 10 },
        activeTab === tab.id && styles.tabTextActive
      ]}>
        {tab.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F0F" />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: isSmallScreen ? 15 : 20 }
          ]}
        >
          
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[
                styles.greeting,
                { fontSize: isSmallScreen ? 22 : 24 }
              ]}>Delegué d'Or</Text>
              <Text style={[
                styles.subtitle,
                { fontSize: isSmallScreen ? 13 : 14 }
              ]}>L'excellence récompensée</Text>
            </View>
            <TouchableOpacity style={[
              styles.notificationButton,
              { 
                width: isSmallScreen ? 40 : 44, 
                height: isSmallScreen ? 40 : 44 
              }
            ]}>
              <Ionicons name="notifications-outline" size={isSmallScreen ? 20 : 24} color="#FFD700" />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Carrousel des vainqueurs */}
          <View style={[
            styles.carouselContainer,
            { height: isSmallScreen ? 280 : 320 }
          ]}>
            <Text style={[
              styles.sectionTitle,
              { fontSize: isSmallScreen ? 18 : 20 }
            ]}>Vainqueur en Vedette</Text>
            <View style={styles.carouselWrapper}>
              <FlatList
                ref={flatListRef}
                data={winners}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                renderItem={renderCarouselItem}
                getItemLayout={getItemLayout}
                onScrollToIndexFailed={handleScrollToIndexFailed}
                snapToInterval={CAROUSEL_ITEM_WIDTH}
                snapToAlignment="center"
                decelerationRate="fast"
              />
            </View>
            <View style={styles.pagination}>
              {winners.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    currentIndex === index && styles.paginationDotActive
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Liste des anciens vainqueurs */}
          <View style={styles.winnersContainer}>
            <View style={styles.sectionHeader}>
              <Text style={[
                styles.sectionTitle,
                { fontSize: isSmallScreen ? 18 : 20 }
              ]}>Anciens Vainqueurs</Text>
              <TouchableOpacity>
                <Text style={[
                  styles.seeAllText,
                  { fontSize: isSmallScreen ? 13 : 14 }
                ]}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={groupedWinners}
              keyExtractor={(item, index) => `row-${index}`}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={renderWinnerRow}
              contentContainerStyle={styles.winnersGrid}
            />
          </View>

        </ScrollView>
      </Animated.View>

      {/* Bottom Navigation Bar */}
      <View style={[
        styles.bottomNav,
        { height: isSmallScreen ? 65 : 70 }
      ]}>
        {bottomTabs.map(renderBottomTab)}
      </View>

    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  greeting: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
  },
  notificationButton: {
    borderRadius: 22,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0F0F0F',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  carouselContainer: {
    marginBottom: 25,
  },
  carouselWrapper: {
    overflow: 'hidden',
    borderRadius: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 12,
  },
  carouselItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  crownContainer: {
    position: 'absolute',
    top: -12,
    zIndex: 2,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  carouselImage: {
    borderRadius: 60,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  carouselInfo: {
    alignItems: 'center',
  },
  carouselName: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  carouselYear: {
    color: '#FFD700',
    marginBottom: 6,
  },
  votesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  votesText: {
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 3,
  },
  paginationDotActive: {
    backgroundColor: '#FFD700',
    width: 16,
  },
  winnersContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    color: '#FFD700',
    fontWeight: '600',
  },
  winnersGrid: {
    paddingBottom: 5,
  },
  winnerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  winnerItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  winnerImage: {
    borderRadius: 30,
    marginBottom: 6,
  },
  winnerInfo: {
    alignItems: 'center',
    width: '100%',
  },
  winnerName: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  winnerYear: {
    color: '#FFD700',
    marginTop: 2,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  tabText: {
    color: '#888',
    marginTop: 3,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFD700',
    fontWeight: '600',
  },
};