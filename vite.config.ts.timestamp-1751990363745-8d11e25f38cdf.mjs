// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/pakhtun-chappal-commerce-68-main/node_modules/vite/dist/node/index.js";
import react from "file:///D:/pakhtun-chappal-commerce-68-main/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "src")
      },
      dedupe: ["react", "react-dom"]
    },
    server: {
      port: 8080,
      strictPort: true,
      open: "/",
      proxy: {
        "/wp-json/wp/v2": {
          target: env.VITE_WORDPRESS_URL || "https://pakhtunleather.com/backend",
          changeOrigin: true,
          secure: false
        },
        "/wp-json/wc": {
          target: env.VITE_WOOCOMMERCE_URL || "https://pakhtunleather.com/backend",
          changeOrigin: true,
          secure: false
        }
      }
    },
    optimizeDeps: {
      include: ["react-dom/client"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwYWtodHVuLWNoYXBwYWwtY29tbWVyY2UtNjgtbWFpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccGFraHR1bi1jaGFwcGFsLWNvbW1lcmNlLTY4LW1haW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Bha2h0dW4tY2hhcHBhbC1jb21tZXJjZS02OC1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKTtcblxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjJyksXG4gICAgICB9LFxuICAgICAgZGVkdXBlOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiA4MDgwLFxuICAgICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICAgIG9wZW46ICcvJyxcbiAgICAgIHByb3h5OiB7XG4gICAgICAgICcvd3AtanNvbi93cC92Mic6IHtcbiAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX1dPUkRQUkVTU19VUkwgfHwgJ2h0dHBzOi8vcGFraHR1bmxlYXRoZXIuY29tL2JhY2tlbmQnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICBzZWN1cmU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICAnL3dwLWpzb24vd2MnOiB7XG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9XT09DT01NRVJDRV9VUkwgfHwgJ2h0dHBzOi8vcGFraHR1bmxlYXRoZXIuY29tL2JhY2tlbmQnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICBzZWN1cmU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgaW5jbHVkZTogWydyZWFjdC1kb20vY2xpZW50J10sXG5cbiAgICB9LFxuICB9O1xufSk7XG5cblxuXG5cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1IsU0FBUyxjQUFjLGVBQWU7QUFDclUsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUdqQixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFFM0MsU0FBTztBQUFBLElBQ0wsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLElBQ2pCLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLEtBQUs7QUFBQSxNQUN4QztBQUFBLE1BQ0EsUUFBUSxDQUFDLFNBQVMsV0FBVztBQUFBLElBQy9CO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxrQkFBa0I7QUFBQSxVQUNoQixRQUFRLElBQUksc0JBQXNCO0FBQUEsVUFDbEMsY0FBYztBQUFBLFVBQ2QsUUFBUTtBQUFBLFFBQ1Y7QUFBQSxRQUNBLGVBQWU7QUFBQSxVQUNiLFFBQVEsSUFBSSx3QkFBd0I7QUFBQSxVQUNwQyxjQUFjO0FBQUEsVUFDZCxRQUFRO0FBQUEsUUFDVjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixTQUFTLENBQUMsa0JBQWtCO0FBQUEsSUFFOUI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
