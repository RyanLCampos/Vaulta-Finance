import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#427549", // verde principal
        secondary: "#64748b", // vermelho para despesas
        info: "#1e3a8a", // azul para saldo
        neutral: "#f5f5f5", // fundo neutro
      },
    },
  },
  plugins: [],
});
