const config = {
    content: ["./src/**/*.{html,js,svelte,ts}", "index.html"],
    darkMode: "class",

    theme: {
        extend: {
            boxShadow: {
                left: "3px 0 15px -3px rgba(0, 0, 0, 0.3)",
            },
            colors: {
                darkest: "#2C3333",
                dark: "#2E4F4F",
                light: "#0E8388",
                lightest: "#CBE4DE",
            },
        },
    },

    plugins: [
        require("daisyui"),
        require("@tailwindcss/forms"),
        require("tailwind-scrollbar-hide"),
    ],
};

module.exports = config;
