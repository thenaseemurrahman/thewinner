#!/bin/bash

echo "🚀 Starting Pakhtun Leather React Frontend & API Servers..."
echo "=================================================="

# Check if PHP server is running
if ! pgrep -f "php -S localhost:8000" > /dev/null; then
    echo "📡 Starting PHP API Proxy Server on port 8000..."
    php -S localhost:8000 &
    PHP_PID=$!
    echo "   ✅ PHP Server PID: $PHP_PID"
else
    echo "   ✅ PHP Server already running on port 8000"
fi

# Check if Vite dev server is running
if ! pgrep -f "vite" > /dev/null; then
    echo "⚛️  Starting React Development Server on port 8080..."
    npm run dev &
    VITE_PID=$!
    echo "   ✅ Vite Server PID: $VITE_PID"
else
    echo "   ✅ React Server already running on port 8080"
fi

echo ""
echo "🌐 Application URLs:"
echo "=================================================="
echo "📱 React Frontend:    http://localhost:8080"
echo "🔌 API Proxy:         http://localhost:8000"
echo "🛒 Test API:          http://localhost:8000/api-proxy.php?endpoint=products&per_page=5"
echo ""
echo "🔧 Environment:"
echo "=================================================="
echo "📦 Node.js:           $(node --version)"
echo "🐘 PHP:               $(php --version | head -1)"
echo "⚙️  Vite Config:       Port 8080 with API proxying"
echo "🔐 WooCommerce:       https://pakhtunleather.com/backend/"
echo ""
echo "📊 System Status:"
echo "=================================================="

# Test connections
echo -n "🧪 Testing React Frontend... "
if curl -s http://localhost:8080 >/dev/null 2>&1; then
    echo "✅ Online"
else
    echo "❌ Offline"
fi

echo -n "🧪 Testing API Proxy... "
if curl -s http://localhost:8000/api-proxy.php?endpoint=products&per_page=1 >/dev/null 2>&1; then
    echo "✅ Online"
else
    echo "❌ Offline"
fi

echo -n "🧪 Testing WooCommerce API... "
if curl -s "http://localhost:8000/api-proxy.php?endpoint=products&per_page=1" | grep -q "name"; then
    echo "✅ Products Loading"
else
    echo "❌ API Issues"
fi

echo ""
echo "🎯 Quick Actions:"
echo "=================================================="
echo "📖 View logs:         tail -f /tmp/php_errors.log"
echo "🔄 Restart PHP:       pkill -f 'php -S' && php -S localhost:8000 &"
echo "🔄 Restart React:     pkill -f vite && npm run dev &"
echo "🛑 Stop all:          pkill -f 'php -S|vite'"
echo ""
echo "📋 Ready! Open http://localhost:8080 in your browser"
echo "=================================================="