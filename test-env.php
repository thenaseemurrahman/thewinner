<?php

// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Test environment loading
echo "<h2>Testing Environment Variables</h2>";

// First try without dotenv
echo "<h3>Direct getenv():</h3>";
echo "VITE_WOOCOMMERCE_URL: " . (getenv('VITE_WOOCOMMERCE_URL') ?: 'NOT FOUND') . "<br>";
echo "VITE_WOOCOMMERCE_KEY: " . (getenv('VITE_WOOCOMMERCE_KEY') ?: 'NOT FOUND') . "<br>";
echo "VITE_WOOCOMMERCE_SECRET: " . (getenv('VITE_WOOCOMMERCE_SECRET') ?: 'NOT FOUND') . "<br>";

// Check if vendor directory exists
echo "<h3>Vendor Directory Check:</h3>";
echo "Vendor autoload exists: " . (file_exists(__DIR__ . '/vendor/autoload.php') ? 'YES' : 'NO') . "<br>";

// Try to load dotenv
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
    
    try {
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv->load();
        
        echo "<h3>After dotenv->load():</h3>";
        echo "VITE_WOOCOMMERCE_URL: " . (getenv('VITE_WOOCOMMERCE_URL') ?: 'NOT FOUND') . "<br>";
        echo "VITE_WOOCOMMERCE_KEY: " . (getenv('VITE_WOOCOMMERCE_KEY') ?: 'NOT FOUND') . "<br>";
        echo "VITE_WOOCOMMERCE_SECRET: " . (getenv('VITE_WOOCOMMERCE_SECRET') ?: 'NOT FOUND') . "<br>";
        
    } catch (Exception $e) {
        echo "Dotenv error: " . $e->getMessage() . "<br>";
    }
} else {
    echo "Vendor autoload not found<br>";
}

// Try reading .env file directly
echo "<h3>Reading .env file directly:</h3>";
if (file_exists(__DIR__ . '/.env')) {
    $envContent = file_get_contents(__DIR__ . '/.env');
    echo "<pre>" . htmlspecialchars($envContent) . "</pre>";
} else {
    echo ".env file not found<br>";
}

?>