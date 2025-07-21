<?php

// Add CORS headers first
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Load environment variables manually
function loadEnvFile($filePath) {
    if (!file_exists($filePath)) {
        return [];
    }
    
    $env = [];
    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    foreach ($lines as $line) {
        $line = trim($line);
        if (strpos($line, '#') === 0) continue; // Skip comments
        
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $env[trim($key)] = trim($value);
        }
    }
    
    return $env;
}

$env = loadEnvFile(__DIR__ . '/.env');

// Get WooCommerce configuration
$woocommerce_url = $env['VITE_WOOCOMMERCE_URL'] ?? '';
$consumer_key = $env['VITE_WOOCOMMERCE_KEY'] ?? '';
$consumer_secret = $env['VITE_WOOCOMMERCE_SECRET'] ?? '';

// Debug: Log the environment variables
error_log("WooCommerce URL: " . $woocommerce_url);
error_log("Consumer Key: " . substr($consumer_key, 0, 10) . "...");

// Get the requested API endpoint from the frontend
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';
$query_string = isset($_SERVER['QUERY_STRING']) ? $_SERVER['QUERY_STRING'] : '';

if (empty($endpoint)) {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(['error' => 'No endpoint specified']);
    exit;
}

if (empty($woocommerce_url) || empty($consumer_key) || empty($consumer_secret)) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'WooCommerce configuration missing', 'debug' => [
        'url' => !empty($woocommerce_url),
        'key' => !empty($consumer_key),
        'secret' => !empty($consumer_secret)
    ]]);
    exit;
}

// Remove the 'endpoint=' part from the query string
$query_string = preg_replace('/(^|&|\?)endpoint=[^&]*/', '', $query_string);
$query_string = trim($query_string, '&?');

// Construct the full WooCommerce API URL
$api_url = rtrim($woocommerce_url, '/') . '/wp-json/wc/v3/' . $endpoint;

// Add query parameters if they exist
if (!empty($query_string)) {
    $api_url .= '?' . $query_string . '&consumer_key=' . $consumer_key . '&consumer_secret=' . $consumer_secret;
} else {
    $api_url .= '?consumer_key=' . $consumer_key . '&consumer_secret=' . $consumer_secret;
}

// Debug: Log the final URL
error_log("Final API URL: " . $api_url);

// Initialize cURL
$ch = curl_init();

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Execute cURL and get the response
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'cURL Error: ' . curl_error($ch)]);
} else {
    // Get the HTTP status code
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    // Set the appropriate HTTP header
    header('Content-Type: application/json');
    http_response_code($http_code);

    // Output the WooCommerce API response
    echo $response;
}

// Close cURL
curl_close($ch);

?>