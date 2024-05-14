// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  semi: true,
  singleQuote: true,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
