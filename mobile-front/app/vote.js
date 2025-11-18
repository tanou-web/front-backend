// app/vote.js
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

const candidates = [
  {
    id: '1',
    name: 'Marie Koné',
    category: 'Musique',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    votes: '2,543'
  },
  {
    id: '2',
    name: 'Jean Traoré',
    category: 'Danse',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    votes: '1,876'
  },
  {
    id: '3',
    name: 'Amina Cissé',
    category: 'Art Plastique',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
    votes: '1,234'
  },
  {
    id: '4',
    name: 'Paul Bamba',
    category: 'Théâtre',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    votes: '987'
  }
];

export default function VoteScreen() {
  const router = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleVote = (candidateId) => {
    setSelectedCandidate(candidateId);
    // Ici vous ajouterez la logique pour enregistrer le vote
    setTimeout(() => {
      alert(`Vote enregistré pour ${candidates.find(c => c.id === candidateId)?.name}`);
      setSelectedCandidate(null);
    }, 1000);
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
        <Text style={styles.title}>Voter</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>
          Choisissez votre talent préféré
        </Text>

        <View style={styles.candidatesList}>
          {candidates.map((candidate) => (
            <View 
              key={candidate.id} 
              style={[
                styles.candidateCard,
                selectedCandidate === candidate.id && styles.candidateCardSelected
              ]}
            >
              <Image 
                source={{ uri: candidate.photo }} 
                style={styles.candidateImage} 
              />
              
              <View style={styles.candidateInfo}>
                <Text style={styles.candidateName}>{candidate.name}</Text>
                <Text style={styles.candidateCategory}>{candidate.category}</Text>
                <View style={styles.votesInfo}>
                  <Ionicons name="heart" size={16} color="#FF6B6B" />
                  <Text style={styles.votesCount}>{candidate.votes} votes</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.voteButton,
                  selectedCandidate === candidate.id && styles.voteButtonSelected
                ]}
                onPress={() => handleVote(candidate.id)}
                disabled={selectedCandidate !== null}
              >
                <Ionicons 
                  name="heart" 
                  size={20} 
                  color={selectedCandidate === candidate.id ? "#FFFFFF" : "#FF6B6B"} 
                />
                <Text style={[
                  styles.voteButtonText,
                  selectedCandidate === candidate.id && styles.voteButtonTextSelected
                ]}>
                  {selectedCandidate === candidate.id ? 'Voté!' : 'Voter'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Text style={styles.note}>
          ⓘ Vous ne pouvez voter qu'une seule fois par catégorie
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
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 30,
  },
  candidatesList: {
    gap: 16,
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
  candidateCardSelected: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderColor: '#FFD700',
  },
  candidateImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  candidateInfo: {
    flex: 1,
  },
  candidateName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  candidateCategory: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 6,
  },
  votesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  votesCount: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginLeft: 6,
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  voteButtonSelected: {
    backgroundColor: '#FF6B6B',
  },
  voteButtonText: {
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 6,
  },
  voteButtonTextSelected: {
    color: '#FFFFFF',
  },
  note: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
  },
};