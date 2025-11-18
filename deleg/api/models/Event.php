<?php
class Event {
    private $conn;
    private $table_name = "events";

    public $id;
    public $titre;
    public $description;
    public $date_debut;
    public $date_fin;
    public $lieu;
    public $created_by;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Créer un événement
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
            (titre, description, date_debut, date_fin, lieu, created_by)
            VALUES (:titre, :description, :date_debut, :date_fin, :lieu, :created_by)";

        $stmt = $this->conn->prepare($query);

        // Nettoyer les entrées
        $this->titre = htmlspecialchars(strip_tags($this->titre));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->date_debut = htmlspecialchars(strip_tags($this->date_debut));
        $this->date_fin = htmlspecialchars(strip_tags($this->date_fin));
        $this->lieu = htmlspecialchars(strip_tags($this->lieu));
        $this->created_by = htmlspecialchars(strip_tags($this->created_by));

        // Lier les paramètres
        $stmt->bindParam(":titre", $this->titre);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":date_debut", $this->date_debut);
        $stmt->bindParam(":date_fin", $this->date_fin);
        $stmt->bindParam(":lieu", $this->lieu);
        $stmt->bindParam(":created_by", $this->created_by);

        return $stmt->execute();
    }

    // Récupérer tous les événements avec pagination et filtres
    public function getAll($filters = [], $page = 1, $limit = 10) {
        $offset = ($page - 1) * $limit;

        $query = "SELECT e.*, u.nom, u.prenom FROM " . $this->table_name . " e
                  JOIN users u ON e.created_by = u.id WHERE 1=1";

        // Filtres optionnels
        if (!empty($filters['created_by'])) {
            $query .= " AND e.created_by=:created_by";
        }
        if (!empty($filters['date_debut'])) {
            $query .= " AND e.date_debut >= :date_debut";
        }
        if (!empty($filters['date_fin'])) {
            $query .= " AND e.date_fin <= :date_fin";
        }
        if (!empty($filters['lieu'])) {
            $query .= " AND e.lieu LIKE :lieu";
        }

        $query .= " ORDER BY e.date_debut DESC LIMIT :offset, :limit";

        $stmt = $this->conn->prepare($query);

        // Bind des filtres
        if (!empty($filters['created_by'])) $stmt->bindParam(":created_by", $filters['created_by'], PDO::PARAM_INT);
        if (!empty($filters['date_debut'])) $stmt->bindParam(":date_debut", $filters['date_debut']);
        if (!empty($filters['date_fin'])) $stmt->bindParam(":date_fin", $filters['date_fin']);
        if (!empty($filters['lieu'])) {
            $lieu = "%".$filters['lieu']."%";
            $stmt->bindParam(":lieu", $lieu);
        }

        $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
        $stmt->bindParam(":limit", $limit, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Mettre à jour un événement
    public function update() {
        $query = "UPDATE " . $this->table_name . "
                  SET titre=:titre, description=:description, date_debut=:date_debut, date_fin=:date_fin, lieu=:lieu
                  WHERE id=:id AND created_by=:created_by";

        $stmt = $this->conn->prepare($query);

        $this->titre = htmlspecialchars(strip_tags($this->titre));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->date_debut = htmlspecialchars(strip_tags($this->date_debut));
        $this->date_fin = htmlspecialchars(strip_tags($this->date_fin));
        $this->lieu = htmlspecialchars(strip_tags($this->lieu));
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->created_by = htmlspecialchars(strip_tags($this->created_by));

        $stmt->bindParam(":titre", $this->titre);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":date_debut", $this->date_debut);
        $stmt->bindParam(":date_fin", $this->date_fin);
        $stmt->bindParam(":lieu", $this->lieu);
        $stmt->bindParam(":id", $this->id, PDO::PARAM_INT);
        $stmt->bindParam(":created_by", $this->created_by, PDO::PARAM_INT);

        return $stmt->execute();
    }

    public function validate() {
    $errors = [];

    // Titre obligatoire et longueur
    if (empty($this->titre)) {
        $errors[] = "Le titre est obligatoire";
    } elseif (strlen($this->titre) < 3) {
        $errors[] = "Le titre doit contenir au moins 3 caractères";
    } elseif (strlen($this->titre) > 100) {
        $errors[] = "Le titre ne doit pas dépasser 100 caractères";
    }

    // Description longueur
    if (!empty($this->description) && strlen($this->description) > 500) {
        $errors[] = "La description ne doit pas dépasser 500 caractères";
    }

    // Dates
    if (empty($this->date_debut) || empty($this->date_fin)) {
        $errors[] = "Les dates de début et de fin sont obligatoires";
    } elseif (strtotime($this->date_debut) >= strtotime($this->date_fin)) {
        $errors[] = "La date de début doit être avant la date de fin";
    }

    return $errors;
}

    // Supprimer un événement
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id=:id AND created_by=:created_by";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id, PDO::PARAM_INT);
        $stmt->bindParam(":created_by", $this->created_by, PDO::PARAM_INT);

        return $stmt->execute();
    }
}
?>
