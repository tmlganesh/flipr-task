/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FCA311', // Example generic color, adjust as needed
                secondary: '#14213D',
            }
        },
    },
    plugins: [],
}
