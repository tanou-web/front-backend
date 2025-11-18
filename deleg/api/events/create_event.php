<?php
header("Content-Type: application/json; charset=UTF-8");

// Inclure les fichiers nécessaires
include_once "../config/database.php";
include_once "../models/Event.php";
include_once "../middleware/auth.php";

// Vérifier le token et récupérer l'utilisateur
$auth = verifyToken(); // retourne ['user_id'=>..., 'role'=>...]

// Vérifier que l'utilisateur est admin ou candidat
if (!in_array($auth['role'], ['admin','candidat'])) {
    http_response_code(403);
    echo json_encode(["message"=>"Accès interdit : admin ou candidat uniquement"]);
    exit;
}

// Connexion à la base
$database = new Database();
$db = $database->getConnection();

// Récupérer les données JSON
$data = json_decode(file_get_contents("php://input"));

// Vérifier les champs obligatoires
$required_fields = ['titre', 'date_debut', 'date_fin'];
$missing = [];
foreach ($required_fields as $field) {
    if (empty($data->$field)) $missing[] = $field;
}

if (!empty($missing)) {
    http_response_code(400);
    echo json_encode(["message" => "Champ(s) manquant(s) : " . implode(", ", $missing)]);
    exit;
}

// Validation des dates
if (strtotime($data->date_debut) >= strtotime($data->date_fin)) {
    http_response_code(400);
    echo json_encode(["message" => "La date de début doit être avant la date de fin ⚠️"]);
    exit;
}

// Créer l'événement
$event = new Event($db);
$event->titre = htmlspecialchars(strip_tags($data->titre));
$event->description = !empty($data->description) ? htmlspecialchars(strip_tags($data->description)) : "";
$event->date_debut = $data->date_debut;
$event->date_fin = $data->date_fin;
$event->lieu = !empty($data->lieu) ? htmlspecialchars(strip_tags($data->lieu)) : "";
$event->created_by = $auth['user_id'];

// Validation avant création
$errors = $event->validate();
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(["message" => "Erreur de validation", "errors" => $errors]);
    exit;
}

// Gestion de l'upload d'image si fournie
$upload_dir = __DIR__ . "/../../uploads/events/";
if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);

if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
    $allowed = ['jpg','jpeg','png','gif'];
    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);

    if (!in_array(strtolower($ext), $allowed)) {
        http_response_code(400);
        echo json_encode(["message"=>"Format de fichier non autorisé"]);
        exit;
    }

    if ($_FILES['image']['size'] > 3*1024*1024) { // max 3MB
        http_response_code(400);
        echo json_encode(["message"=>"Fichier trop volumineux"]);
        exit;
    }

    $filename = uniqid() . "." . $ext;
    $destination = $upload_dir . $filename;

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $destination)) {
        http_response_code(500);
        echo json_encode(["message"=>"Erreur lors de l'upload de l'image"]);
        exit;
    }

    $event->image = "uploads/events/" . $filename; // chemin relatif pour BDD
} else {
    $event->image = null; // pas d'image fournie
}

// Créer l'événement dans la base
if ($event->create()) {
    http_response_code(201);
    echo json_encode(["message" => "Événement créé ✅"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Erreur lors de la création ❌"]);
}
?>
