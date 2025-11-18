<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/database.php";
include_once "../models/User.php";

// Connexion à la base
$database = new Database();
$db = $database->getConnection();

// Récupération des données JSON
$data = json_decode(file_get_contents("php://input"));

// Vérifie les champs obligatoires
$required_fields = ['nom','prenom','email','mot_de_passe','numero','universite','role'];
$missing = [];
foreach ($required_fields as $field) {
    if (empty($data->$field)) $missing[] = $field;
}
if (!empty($missing)) {
    http_response_code(400);
    echo json_encode(["message" => "Champs manquants : " . implode(", ", $missing)]);
    exit;
}

// Création de l'utilisateur
$user = new User($db);
$user->nom = $data->nom;
$user->prenom = $data->prenom;
$user->email = $data->email;
$user->numero = $data->numero;
$user->mot_de_passe = $data->mot_de_passe;
$user->universite = $data->universite;
$user->role = $data->role;

// Upload photo si fournie
if (isset($_FILES['photo']) && $_FILES['photo']['error'] === 0) {
    $allowed = ['jpg','jpeg','png','gif'];
    $ext = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);

    if (!in_array(strtolower($ext), $allowed)) {
        http_response_code(400);
        echo json_encode(["message"=>"Format de fichier non autorisé"]);
        exit;
    }

    if ($_FILES['photo']['size'] > 2*1024*1024) {
        http_response_code(400);
        echo json_encode(["message"=>"Fichier trop volumineux"]);
        exit;
    }

    $filename = uniqid() . "." . $ext;
    $destination = __DIR__ . "/../../uploads/users/" . $filename;

    if (!move_uploaded_file($_FILES['photo']['tmp_name'], $destination)) {
        http_response_code(500);
        echo json_encode(["message"=>"Erreur lors de l'upload de l'image"]);
        exit;
    }

    $user->photo = "uploads/users/" . $filename;
} else {
    $user->photo = null;
}

// Vérifie que les candidats ont une photo
if ($user->role === "candidat" && empty($user->photo)) {
    http_response_code(400);
    echo json_encode(["message" => "La photo est obligatoire pour les candidats ⚠️"]);
    exit();
}

// Validation avant inscription
$errors = $user->validate();
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(["message" => "Erreur de validation", "errors" => $errors]);
    exit;
}

// Inscription
if ($user->register()) {
    http_response_code(201);
    echo json_encode(["message" => "Inscription réussie ✅"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Erreur lors de l’inscription ❌"]);
}
?>
