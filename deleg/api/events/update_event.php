<?php
header("Content-Type: application/json; charset=UTF-8");
include_once "../config/database.php";
include_once "../models/Event.php";
include_once "../middleware/auth.php";

$auth = verifyToken(); // récupère user_id et role

$database = new Database();
$db = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

// Vérifier champs obligatoires
$required_fields = ['id', 'titre', 'date_debut', 'date_fin'];
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

// Vérifier si l'utilisateur est l'auteur ou admin
$event = new Event($db);
$event->id = $data->id;
$event->created_by = $auth['user_id'];

// Optionnel : récupérer l’événement pour vérifier si l’utilisateur est l’auteur
$stmt = $db->prepare("SELECT created_by FROM events WHERE id=:id LIMIT 1");
$stmt->bindParam(":id", $event->id, PDO::PARAM_INT);
$stmt->execute();
$existing = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$existing) {
    http_response_code(404);
    echo json_encode(["message"=>"Événement introuvable ❌"]);
    exit;
}

if ($auth['role'] != 'admin' && $existing['created_by'] != $auth['user_id']) {
    http_response_code(403);
    echo json_encode(["message"=>"Accès refusé ❌"]);
    exit;
}

// Mise à jour
$event->titre = htmlspecialchars(strip_tags($data->titre));
$event->description = !empty($data->description) ? htmlspecialchars(strip_tags($data->description)) : "";
$event->date_debut = $data->date_debut;
$event->date_fin = $data->date_fin;
$event->lieu = !empty($data->lieu) ? htmlspecialchars(strip_tags($data->lieu)) : "";

if ($event->update()) {
    http_response_code(200);
    echo json_encode(["message"=>"Événement mis à jour ✅"]);
} else {
    http_response_code(500);
    echo json_encode(["message"=>"Erreur lors de la mise à jour ❌"]);
}
?>
