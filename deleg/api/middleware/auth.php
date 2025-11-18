<?php
require_once __DIR__ . '/../../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "TON_SECRET_KEY";

// Vérifie que le token est valide
function verifyToken() {
    global $secret_key;
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["message"=>"Token manquant"]);
        exit;
    }

    $token = str_replace("Bearer ", "", $headers['Authorization']);
    try {
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
        return (array)$decoded;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["message"=>"Token invalide", "error"=>$e->getMessage()]);
        exit;
    }
}

// Vérifie si l'utilisateur est admin
function verifyAdmin() {
    $user = verifyToken();
    if ($user['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode(["message"=>"Accès interdit : admin uniquement"]);
        exit;
    }
    return $user;
}

// Vérifie si l'utilisateur est candidat
function verifyCandidat() {
    $user = verifyToken();
    if ($user['role'] !== 'candidat' && $user['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode(["message"=>"Accès interdit : candidat ou admin uniquement"]);
        exit;
    }
    return $user;
}

// Vérifie si l'utilisateur est électeur
function verifyElecteur() {
    $user = verifyToken();
    if ($user['role'] !== 'electeur' && $user['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode(["message"=>"Accès interdit : électeur ou admin uniquement"]);
        exit;
    }
    return $user;
}
?>
