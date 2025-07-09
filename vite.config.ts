import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      },
      dedupe: ['react', 'react-dom'],
    },
    server: {
      port: 8080,
      strictPort: true,
      open: '/',
      headers: {
        'Content-Security-Policy': [
          "default-src 'self';",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gs-extension-embeds-final.vercel.app https://connect.facebook.net;",
          "script-src-elem 'self' 'unsafe-inline' https://gs-extension-embeds-final.vercel.app https://connect.facebook.net;",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://gs-extension-embeds-final.vercel.app;",
          "font-src 'self' data: https://fonts.gstatic.com;",
          "img-src 'self' data: https: https://www.facebook.com;",
          "connect-src 'self' https://pakhtunleather.com https://gs-extension-embeds-final.vercel.app https://connect.facebook.net;",
          "frame-src 'self' https://www.facebook.com;",
          "media-src 'self';",
          "object-src 'none';"
        ].join(' '),
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
      proxy: {
        // Proxy for WooCommerce API
        '^/api/backend/wp-json/wc/v3': {
          target: 'https://pakhtunleather.com',
          changeOrigin: true,
          secure: false,
          // Rewrite the path to include /backend
          rewrite: (path) => path.replace(/^\/api\/backend/, '/backend'),
          configure: (proxy, _options) => {
            proxy.on('error', (err, req, _res) => {
              console.error('WooCommerce Proxy error:', {
                error: err,
                url: req.url,
                headers: req.headers
              });
            });
            
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              // Add CORS headers to the proxied request
              proxyReq.setHeader('Origin', 'https://pakhtunleather.com');
              proxyReq.setHeader('Referer', 'https://pakhtunleather.com');
              
              console.log('Proxying request to WooCommerce API:', {
                method: req.method,
                target: 'https://pakhtunleather.com' + (req.url || ''),
                headers: proxyReq.getHeaders()
              });
            });
            
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              // Add CORS headers to the response
              proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080';
              proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
              proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
              proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
              
              console.log('Received response from WooCommerce API:', {
                statusCode: proxyRes.statusCode,
                statusMessage: proxyRes.statusMessage,
                url: req.url,
                headers: proxyRes.headers
              });
            });
          }
        },
        // Proxy for WordPress REST API
        '^/api/backend/wp-json/wp/v2': {
          target: 'https://pakhtunleather.com',
          changeOrigin: true,
          secure: false,
          // Rewrite the path to include /backend
          rewrite: (path) => path.replace(/^\/api\/backend/, '/backend'),
          configure: (proxy, _options) => {
            proxy.on('error', (err, req, _res) => {
              console.error('WordPress Proxy error:', {
                error: err,
                url: req.url,
                headers: req.headers
              });
            });
            
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              // Add CORS headers to the proxied request
              proxyReq.setHeader('Origin', 'https://pakhtunleather.com');
              proxyReq.setHeader('Referer', 'https://pakhtunleather.com');
              
              console.log('Proxying request to WordPress API:', {
                method: req.method,
                target: 'https://pakhtunleather.com' + (req.url || ''),
                headers: proxyReq.getHeaders()
              });
            });
            
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              // Add CORS headers to the response
              proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080';
              proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
              proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
              proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
              
              console.log('Received response from WordPress API:', {
                statusCode: proxyRes.statusCode,
                statusMessage: proxyRes.statusMessage,
                url: req.url,
                headers: proxyRes.headers
              });
            });
          }
        },
        // Proxy for WordPress REST API
        '^/api/wp-json/wp/v2': {
          target: 'https://pakhtunleather.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.error('WordPress Proxy error:', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Proxying WordPress request to:', req.url);
              // Add any required headers here
              proxyReq.setHeader('X-Forwarded-Host', 'localhost:8080');
              proxyReq.setHeader('X-Forwarded-Proto', 'http');
            });
          }
        },
        // General proxy for other API requests
        '^/api': {
          target: 'https://pakhtunleather.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.error('API Proxy error:', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Proxying API request to:', req.url);
              // Add any required headers here
              proxyReq.setHeader('X-Forwarded-Host', 'localhost:8080');
              proxyReq.setHeader('X-Forwarded-Proto', 'http');
            });
          }
        }
      }
    },
    optimizeDeps: {
      include: ['react-dom/client'],

    },
  };
});




