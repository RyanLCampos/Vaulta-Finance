import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: "Rubik", sans-serif;
        min-height: 100vh;
        background: #427561;
        background: linear-gradient(90deg,rgba(66, 117, 97, 1) 0%, rgba(87, 199, 133, 1) 50%, rgb(34, 217, 2) 100%);
    }
    
    .cards {
        background-color: rgba(255, 255, 255, 0.92);
        border: 1px solid rgba(255, 255, 255, 0.35);
    }

    .recharts-wrapper:focus,
    .recharts-wrapper *:focus {
    outline: none;
    }
    
`;
