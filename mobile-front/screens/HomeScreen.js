import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image 
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Deleg d'Or</Text>
      <Text style={styles.subtitle}>Gestion moderne des délégués</Text>

      {/* Buttons */}
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.btnPrimary}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.btnPrimaryText}>Connexion</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnSecondary}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.btnSecondaryText}>Créer un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // noir
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFD700', // or
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    marginBottom: 40,
  },
  buttons: {
    width: '100%',
  },
  btnPrimary: {
    backgroundColor: '#FFD700', // or
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  btnPrimaryText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnSecondary: {
    borderWidth: 2,
    borderColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 18,
  }
});
