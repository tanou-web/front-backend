import AsyncStorage from '@react-native-async-storage/async-storage';

// URL du server php 
const API_BASE_URL = 'http://localhost:8000/deleg/api/auth';

class ApiService {
    // Stockage
    static setToken = async (token) => {
        await AsyncStorage.setItem('userToken', token);
    };

    // Récupération du token
    static getToken = async () => {
        return await AsyncStorage.getItem('userToken');
    };

    // Supprimer le token
    static removeToken = async () => {
        await AsyncStorage.removeItem('userToken');
    };

    // Headers communs
    static getHeaders = async (isFormData = false) => {
        const token = await this.getToken();
        const headers = {
            'Authorization': token ? `Bearer ${token}` : '',
        };

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }
        return headers;
    };

    // Fonction de requête générique
    static async request(endpoint, options = {}) {
        try {
            const fullUrl = `${API_BASE_URL}${endpoint}`;
            console.log('🌐 API Call:', fullUrl);
            
            const response = await fetch(fullUrl, options);
            
            const text = await response.text();
            let data;
            
            try {
                data = text ? JSON.parse(text) : {};
            } catch (parseError) {
                console.error('❌ JSON Parse Error:', parseError);
                throw new Error('Invalid JSON response from server');
            }
            
            if (!response.ok) {
                throw new Error(data.message || `Erreur serveur: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error('🚨 API Error:', error);
            throw error;
        }
    }

    // Connexion
    static login = async (email, mot_de_passe) => {
        const response = await this.request('/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                mot_de_passe: mot_de_passe,
            }),
        });

        if (response.token) {
            await this.setToken(response.token);
        }
        return response;
    };

    // Inscription
    static register = async (userData) => {
        return this.request('/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nom: userData.nom,
                prenom: userData.prenom,
                email: userData.email,
                mot_de_passe: userData.password,
                numero: userData.numero,
                universite: userData.universite,
                role: userData.role,
                photo: userData.photo || null
            }),
        });
    };
}

export default ApiService;