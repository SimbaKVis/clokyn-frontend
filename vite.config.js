import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  host: '0.0.0.0', // Allows access from other devices on the network
  port: 5000, // Specify the port you want to use
})
