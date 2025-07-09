<?php

require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Replace with your actual WooCommerce details
$woocommerce_url = getenv('VITE_WOOCOMMERCE_URL');
$consumer_key = getenv('VITE_WOOCOMMERCE_KEY');
$consumer_secret = getenv('VITE_WOOCOMMERCE_SECRET');

// Get the requested API endpoint from the frontend
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';
$query_string = isset($_SERVER['QUERY_STRING']) ? $_SERVER['QUERY_STRING'] : '';

// Construct the full WooCommerce API URL
// Remove the 'endpoint=' part from the query string
$query_string = preg_replace('/(^|&|\?)endpoint=[^&]*/', '', $query_string);
$api_url = $woocommerce_url . '/wc/v3/' . $endpoint . '?' . $query_string;

// Add authentication parameters
$api_url .= '&consumer_key=' . $consumer_key . '&consumer_secret=' . $consumer_secret;

// Initialize cURL
$ch = curl_init();

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false); // Don't include header in output

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