<?php
class User {
    private $conn;
    private $table_name = "users";

    public $id;
    public $nom;
    public $prenom;
    public $email;
    public $mot_de_passe;
    public $numero;
    public $universite;
    public $photo;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Inscription
    public function register() {
        $query = "INSERT INTO " . $this->table_name . " 
            (nom, prenom, email, mot_de_passe, numero, universite, photo)
            VALUES (:nom, :prenom, :email, :mot_de_passe, :numero, :universite, :photo)";
        $stmt = $this->conn->prepare($query);

        // Sécurisation des champs
        $this->nom = htmlspecialchars(strip_tags($this->nom));
        $this->prenom = htmlspecialchars(strip_tags($this->prenom));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->mot_de_passe = password_hash($this->mot_de_passe, PASSWORD_BCRYPT);
        $this->numero = htmlspecialchars(strip_tags($this->numero));
        $this->universite = htmlspecialchars(strip_tags($this->universite));
        $this->photo = htmlspecialchars(strip_tags($this->photo));

        // Liaison des paramètres
        $stmt->bindParam(":nom", $this->nom);
        $stmt->bindParam(":prenom", $this->prenom);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":mot_de_passe", $this->mot_de_passe);
        $stmt->bindParam(":numero", $this->numero);
        $stmt->bindParam(":universite", $this->universite);
        $stmt->bindParam(":photo", $this->photo);

        return $stmt->execute();
    }
	public function validate() {
   		$errors = [];

   		// Email
   		if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
        	$errors[] = "Email invalide";
    	}

    	// Mot de passe
    	if (strlen($this->mot_de_passe) < 6) {
        	$errors[] = "Mot de passe trop court (minimum 6 caractères)";
    	}
    	// Optionnel : vérifier complexité
    	if (!preg_match("/[A-Z]/", $this->mot_de_passe)) {
       	 	$errors[] = "Mot de passe doit contenir au moins une majuscule";
    	}
    	if (!preg_match("/[0-9]/", $this->mot_de_passe)) {
        	$errors[] = "Mot de passe doit contenir au moins un chiffre";
    	}

   		return $errors; // tableau vide si ok
	}

    // Connexion avec précision de l'erreur
    public function login() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE email = :email LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $this->email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !password_verify($this->mot_de_passe, $user['mot_de_passe'])) {
            
            return ["success" => false];
        }
        /*
        if (!password_verify($this->mot_de_passe, $user['mot_de_passe'])) {
            // Mot de passe incorrect
            return ["success" => false, "error" => "mot_de_passe"];
        }
        */
        // Connexion réussie
        unset($user['mot_de_passe']); // Ne jamais renvoyer le mot de passe
        return ["success" => true, "user" => $user];
    }
}
?>
