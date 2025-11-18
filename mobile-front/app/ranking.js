// app/ranking.js
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const rankings = [
  {
    id: '1',
    rank: 1,
    name: 'Marie Koné',
    category: 'Musique',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    votes: '15,234',
    trend: 'up'
  },
  {
    id: '2',
    rank: 2,
    name: 'Koffi Doumbia',
    category: 'Danse',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    votes: '14,876',
    trend: 'up'
  },
  {
    id: '3',
    rank: 3,
    name: 'Jean Traoré',
    category: 'Danse',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    votes: '13,542',
    trend: 'down'
  },
  {
    id: '4',
    rank: 4,
    name: 'Sophie Yao',
    category: 'Musique',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    votes: '12,987',
    trend: 'up'
  },
  {
    id: '5',
    rank: 5,
    name: 'Amina Cissé',
    category: 'Art Plastique',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
    votes: '11,543',
    trend: 'stable'
  },
  {
    id: '6',
    rank: 6,
    name: 'Paul Bamba',
    category: 'Théâtre',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    votes: '10,876',
    trend: 'up'
  }
];

export default function RankingScreen() {
  const router = useRouter();
  const [timeFilter, setTimeFilter] = useState('all'); // all, week, month

  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return '#FFD700'; // Or
      case 2: return '#C0C0C0'; // Argent
      case 3: return '#CD7F32'; // Bronze
      default: return '#FFD700';
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      default: return 'remove';
    }
  };

  const getTrendColor = (trend) => {
    switch(trend) {
      case 'up': return '#4ECDC4';
      case 'down': return '#FF6B6B';
      default: return '#888';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F0F" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFD700" />
        </TouchableOpacity>
        <Text style={styles.title}>Classement</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Filtres temporels */}
        <View style={styles.filters}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              timeFilter === 'all' && styles.filterButtonActive
            ]}
            onPress={() => setTimeFilter('all')}
          >
            <Text style={[
              styles.filterText,
              timeFilter === 'all' && styles.filterTextActive
            ]}>
              Général
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              timeFilter === 'week' && styles.filterButtonActive
            ]}
            onPress={() => setTimeFilter('week')}
          >
            <Text style={[
              styles.filterText,
              timeFilter === 'week' && styles.filterTextActive
            ]}>
              Semaine
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              timeFilter === 'month' && styles.filterButtonActive
            ]}
            onPress={() => setTimeFilter('month')}
          >
            <Text style={[
              styles.filterText,
              timeFilter === 'month' && styles.filterTextActive
            ]}>
              Mois
            </Text>
          </TouchableOpacity>
        </View>

        {/* Podium */}
        <View style={styles.podiumSection}>
          <Text style={styles.sectionTitle}>Podium</Text>
          
          {/* Top 3 */}
          <View style={styles.podium}>
            {/* 2ème place */}
            <View style={[styles.podiumItem, styles.secondPlace]}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankNumber}>2</Text>
              </View>
              <Image 
                source={{ uri: rankings[1].photo }} 
                style={styles.podiumImage} 
              />
              <Text style={styles.podiumName}>{rankings[1].name}</Text>
              <Text style={styles.podiumVotes}>{rankings[1].votes}</Text>
            </View>

            {/* 1ère place */}
            <View style={[styles.podiumItem, styles.firstPlace]}>
              <View style={[styles.rankBadge, styles.firstPlaceBadge]}>
                <Ionicons name="trophy" size={20} color="#0F0F0F" />
              </View>
              <Image 
                source={{ uri: rankings[0].photo }} 
                style={styles.podiumImage} 
              />
              <Text style={styles.podiumName}>{rankings[0].name}</Text>
              <Text style={styles.podiumVotes}>{rankings[0].votes}</Text>
            </View>

            {/* 3ème place */}
            <View style={[styles.podiumItem, styles.thirdPlace]}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankNumber}>3</Text>
              </View>
              <Image 
                source={{ uri: rankings[2].photo }} 
                style={styles.podiumImage} 
              />
              <Text style={styles.podiumName}>{rankings[2].name}</Text>
              <Text style={styles.podiumVotes}>{rankings[2].votes}</Text>
            </View>
          </View>
        </View>

        {/* Liste du classement */}
        <View style={styles.rankingList}>
          <Text style={styles.sectionTitle}>Classement Complet</Text>
          
          {rankings.slice(3).map((candidate, index) => (
            <TouchableOpacity key={candidate.id} style={styles.rankingItem}>
              <View style={styles.rankingLeft}>
                <Text style={[
                  styles.rankingNumber,
                  { color: getRankColor(candidate.rank) }
                ]}>
                  {candidate.rank}
                </Text>
                
                <Image 
                  source={{ uri: candidate.photo }} 
                  style={styles.rankingImage} 
                />
                
                <View style={styles.rankingInfo}>
                  <Text style={styles.rankingName}>{candidate.name}</Text>
                  <Text style={styles.rankingCategory}>{candidate.category}</Text>
                </View>
              </View>

              <View style={styles.rankingRight}>
                <View style={styles.trendContainer}>
                  <Ionicons 
                    name={getTrendIcon(candidate.trend)} 
                    size={16} 
                    color={getTrendColor(candidate.trend)} 
                  />
                </View>
                <Text style={styles.rankingVotes}>{candidate.votes}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  headerPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 30,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  filterButtonActive: {
    backgroundColor: '#FFD700',
  },
  filterText: {
    color: '#FFD700',
    fontWeight: '600',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#0F0F0F',
  },
  podiumSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 10,
  },
  podiumItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  firstPlace: {
    paddingBottom: 30,
    borderColor: '#FFD700',
  },
  secondPlace: {
    paddingBottom: 20,
  },
  thirdPlace: {
    paddingBottom: 10,
  },
  rankBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  firstPlaceBadge: {
    backgroundColor: '#FFD700',
  },
  rankNumber: {
    color: '#0F0F0F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  podiumImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  podiumName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  podiumVotes: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
  },
  rankingList: {
    marginBottom: 20,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  rankingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankingNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 24,
    textAlign: 'center',
  },
  rankingImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 12,
  },
  rankingInfo: {
    flex: 1,
  },
  rankingName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  rankingCategory: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  rankingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trendContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankingVotes: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFD700',
    minWidth: 60,
    textAlign: 'right',
  },
};