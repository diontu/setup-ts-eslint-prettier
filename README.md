# Your go-to script for setting up TS, ESLint and Prettier

Set up TS, ESLint, and Prettier with a single command and start writing the important parts of the your app!

more info tbd...

```
npx setup-ts-eslint-prettier
```

# random notes

- tsconfig will have an error if there's no files for it to look at. Ensure you have a file for TS to look at and you will not get an error anymore.
- the ESLint flat configs do not work with the react-hooks eslint plugin. If you want to use that plugin:
  - downgrade to tseslint 7 or lower
  - downgrade to eslint 8 or lower (to the specified version as noted in tseslint)
