<?php
header("Content-Type: application/json; charset=UTF-8");

// Inclusion correcte avec __DIR__ pour le chemin absolu
include_once __DIR__ . "/../config/database.php";
include_once __DIR__ . "/../models/User.php";
require_once __DIR__ . "/../../vendor/autoload.php";

use \Firebase\JWT\JWT;

$secret_key = "TON_SECRET_KEY_LONGUE_ET_SECURISEE";

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->mot_de_passe)) {

    $user = new User($db);
    $user->email = $data->email;
    $user->mot_de_passe = $data->mot_de_passe;

    $result = $user->login();

    if ($result['success']) {
        $payload = [
            "iss" => "http://localhost",
            "aud" => "http://localhost",
            "iat" => time(),
            "exp" => time() + 3600, // 1 heure
            "user_id" => $result['user']['id'],
            "role" => $result['user']['role']
        ];

        $jwt = JWT::encode($payload, $secret_key, 'HS256');

        http_response_code(200);
        echo json_encode([
            "message" => "Connexion réussie ✅",
            "token" => $jwt,
            "user" => $result['user']
        ]);

    } else {
        http_response_code(401);
        $msg = $result['error'] === "Email  ou Mot de passe incorrect ❌";
        echo json_encode(["message" => $msg]);
    }

} else {
    http_response_code(400);
    echo json_encode(["message" => "Email et mot de passe requis ⚠️"]);
}
