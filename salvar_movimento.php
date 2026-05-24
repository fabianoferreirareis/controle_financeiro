<?php

require_once "conexao.php";

$tipo = $_POST['tipo'] ?? '';
$data_mov = $_POST['data_mov'] ?? '';
$descricao = $_POST['descricao'] ?? '';
$categoria = $_POST['categoria'] ?? '';
$forma_pagamento = $_POST['forma_pagamento'] ?? '';
$valor = $_POST['valor'] ?? 0;
$observacao = $_POST['observacao'] ?? '';
$usuario = 'admin';

$sql = "INSERT INTO financeiro_movimento 
(tipo, data_mov, descricao, categoria, forma_pagamento, valor, observacao, usuario)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "sssssdss",
    $tipo,
    $data_mov,
    $descricao,
    $categoria,
    $forma_pagamento,
    $valor,
    $observacao,
    $usuario
);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok"]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => $stmt->error]);
}