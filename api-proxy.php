<?php

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Allow requests from any origin during development
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    exit(0);
}

// Allow requests from any origin for actual requests (GET, POST, etc.)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Define the path to the woo-proxy.php file outside public_html
// ADJUST THIS PATH based on where you placed woo-proxy.php relative to public_html
$proxy_script_path = __DIR__ . '/woo-proxy.php'; // Assuming woo-proxy.php is in the same directory

// Check if the proxy script exists and include it for non-OPTIONS requests
if (file_exists($proxy_script_path)) {
    require_once $proxy_script_path;
} else {
    // Handle error if the proxy script is not found
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Proxy script not found. Please check the path in api-proxy.php']);
}

?>