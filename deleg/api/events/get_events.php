<?php
header("Content-Type: application/json; charset=UTF-8");
include_once "../config/database.php";
include_once "../models/Event.php";
include_once "../middleware/auth.php";

$auth = verifyToken(); // utilisateur connecté

$database = new Database();
$db = $database->getConnection();
$event = new Event($db);

// Récupération des paramètres GET
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;

$filters = [];
if (isset($_GET['created_by'])) $filters['created_by'] = (int)$_GET['created_by'];
if (isset($_GET['date_debut'])) $filters['date_debut'] = $_GET['date_debut'];
if (isset($_GET['date_fin'])) $filters['date_fin'] = $_GET['date_fin'];
if (isset($_GET['lieu'])) $filters['lieu'] = $_GET['lieu'];

// Récupération des événements
$events = $event->getAll($filters, $page, $limit);

http_response_code(200);
echo json_encode([
    "page" => $page,
    "limit" => $limit,
    "count" => count($events),
    "events" => $events
]);
?>
