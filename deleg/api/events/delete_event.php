<?php
header("Content-Type: application/json; charset=UTF-8");
include_once "../config/database.php";
include_once "../models/Event.php";
include_once "../middleware/auth.php";

$auth = verifyToken(); // récupère user_id et role

$database = new Database();
$db = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

// Vérifier l'ID
if (empty($data->id)) {
    http_response_code(400);
    echo json_encode(["message"=>"ID de l'événement requis ⚠️"]);
    exit;
}

// Vérifier si l'événement existe
$stmt = $db->prepare("SELECT created_by FROM events WHERE id=:id LIMIT 1");
$stmt->bindParam(":id", $data->id, PDO::PARAM_INT);
$stmt->execute();
$existing = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$existing) {
    http_response_code(404);
    echo json_encode(["message"=>"Événement introuvable ❌"]);
    exit;
}

// Vérifier les permissions
if ($auth['role'] != 'admin' && $existing['created_by'] != $auth['user_id']) {
    http_response_code(403);
    echo json_encode(["message"=>"Accès refusé ❌"]);
    exit;
}

// Supprimer l'événement
$event = new Event($db);
$event->id = $data->id;
$event->created_by = $auth['user_id'];

if ($event->delete()) {
    http_response_code(200);
    echo json_encode(["message"=>"Événement supprimé ✅"]);
} else {
    http_response_code(500);
    echo json_encode(["message"=>"Erreur lors de la suppression ❌"]);
}
?>
