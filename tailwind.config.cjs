const config = {
    content: ["./src/**/*.{html,js,svelte,ts}", "index.html"],
    darkMode: "class",

    theme: {
        extend: {
            colors: {
                darkest: "#2C3333",
                dark: "#2E4F4F",
                light: "#0E8388",
                lightest: "#CBE4DE",
            },
        },
    },

    plugins: [require("daisyui")],
};

module.exports = config;
