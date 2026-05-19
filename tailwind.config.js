/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./client/**/*.{html,js,jsx}",
        "./imports/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                loading: {
                    '0%': {width: '0%'},
                    '100%': {width: '100%'},
                }
            },
        },
    },
    plugins: [],
};