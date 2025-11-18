// app/candidates.js
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const categories = [
  { id: 'all', name: 'Tous', icon: 'apps' },
  { id: 'music', name: 'Musique', icon: 'musical-notes' },
  { id: 'dance', name: 'Danse', icon: 'body' },
  { id: 'art', name: 'Art Plastique', icon: 'color-palette' },
  { id: 'theater', name: 'Théâtre', icon: 'film' },
];

const candidates = [
  {
    id: '1',
    name: 'Marie Koné',
    category: 'music',
    specialty: 'Chant Gospel',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    votes: '2,543',
    city: 'Abidjan'
  },
  {
    id: '2',
    name: 'Jean Traoré',
    category: 'dance',
    specialty: 'Danse Traditionnelle',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    votes: '1,876',
    city: 'Bouaké'
  },
  {
    id: '3',
    name: 'Amina Cissé',
    category: 'art',
    specialty: 'Peinture sur tissu',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
    votes: '1,234',
    city: 'Korhogo'
  },
  {
    id: '4',
    name: 'Paul Bamba',
    category: 'theater',
    specialty: 'Comédie dramatique',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    votes: '987',
    city: 'San Pedro'
  },
  {
    id: '5',
    name: 'Sophie Yao',
    category: 'music',
    specialty: 'Piano Classique',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    votes: '1,543',
    city: 'Yamoussoukro'
  },
  {
    id: '6',
    name: 'Koffi Doumbia',
    category: 'dance',
    specialty: 'Hip-hop',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    votes: '2,110',
    city: 'Abidjan'
  }
];

export default function CandidatesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCandidates = selectedCategory === 'all' 
    ? candidates 
    : candidates.filter(candidate => candidate.category === selectedCategory);

  const renderCandidateItem = ({ item }) => (
    <TouchableOpacity style={styles.candidateCard}>
      <Image source={{ uri: item.photo }} style={styles.candidateImage} />
      
      <View style={styles.candidateInfo}>
        <Text style={styles.candidateName}>{item.name}</Text>
        <Text style={styles.candidateSpecialty}>{item.specialty}</Text>
        
        <View style={styles.candidateDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={14} color="#FFD700" />
            <Text style={styles.detailText}>{item.city}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="heart" size={14} color="#FF6B6B" />
            <Text style={styles.detailText}>{item.votes} votes</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.profileButton}
        onPress={() => router.push(`/candidate/${item.id}`)}
      >
        <Ionicons name="eye" size={20} color="#FFD700" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

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
        <Text style={styles.title}>Candidats</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Filtres par catégorie */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons 
                name={category.icon} 
                size={20} 
                color={selectedCategory === category.id ? '#0F0F0F' : '#FFD700'} 
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Liste des candidats */}
        <View style={styles.candidatesSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Tous les candidats' : 
             categories.find(c => c.id === selectedCategory)?.name + 's'} 
            ({filteredCandidates.length})
          </Text>
          
          <FlatList
            data={filteredCandidates}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={renderCandidateItem}
            contentContainerStyle={styles.candidatesList}
          />
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
  },
  categoriesScroll: {
    marginVertical: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    gap: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  categoryText: {
    color: '#FFD700',
    fontWeight: '600',
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#0F0F0F',
  },
  candidatesSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  candidatesList: {
    gap: 12,
  },
  candidateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  candidateImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  candidateInfo: {
    flex: 1,
  },
  candidateName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  candidateSpecialty: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 8,
  },
  candidateDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  profileButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
};