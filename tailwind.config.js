/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "clr-bg-sd" : "#6EA2F1",
        "clr-text-click": "#C238E4",
        "clr-icon-click":"#BCB4D7",
        "cl-white":"#FFFFFF",
        "bg-amber":"#F9BD47",
        "light-white":'rgba(255,255,255,0.18)',
        "btn-primary":'#80c92c',
        "Bg-alert":'#E7CECE'
      },
      fontFamily:{
        'montserrat' :["'Montserrat'",'semi-bold']
      }
    },
  },
  plugins: [],
}