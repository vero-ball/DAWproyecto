/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2A6ACB",    // Azul principal
        secondary: "#F9D94A",  // Amarelo principal
        accent: "#E6B800",     // Dourado
        success: "#4CA44C",    // Verde
        error: "#E23D3D",      // Vermello
        dark: "#222222",       // Negro
        light: "#FFFFFF",      // Branco
      }
    }
  },
  plugins: [],
}

