<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Method: POST");
header("Access-Control-Allow-Headers: Content-Type,Authorization,X-Requested-With");

include_once "../config/database.php";
$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->user_id)&&
    !empty($data->even_id)&&
    !empty($data->bio)&&
    !empty($data->photo_url)
){
    $query = "INSERT INTO candidates (user_id, event_id,bio,photo_url,status)
              VALUES(:user_id,:even_id,:bio,:photo_url,'en_attente')";
    $stmt = $db->prepare($query);

    $stmt ->bindParam(":user_id", $data->user_id);
    $stmt->bindParam(":event_id", $data->event_id);
    $stmt->bindParam(":photo_url",$data->photo_url);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["message" => "Candidature enregistrée avec succès ✅"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Erreur lors de l’enregistrement ❌"]);
    }
}   else {
        http_response_code(400);
        echo json_encode(["message" => "Champs obligatoires manquants ⚠️"]);
    }

?>