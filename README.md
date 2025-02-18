# Employee Management Site

This site is a simple site to manage `companies` and `jobs`

## Preview

Frontend address: [Preview](https://ems-site.ali-moradzade.work.gd/)  
Backed address: [Preview](https://api.ems-site.ali-moradzade.work.gd/docs)

## Usage

You can install dependencies for both front & backend by going to their directories and running:

```bash
npm install
```

After that you can start backend and front-end by going into their directories and running:

```bash
npm run start
```

After that front will be available on port `3000` and backend will be available based on `PORT`
inside `.env.development`

## Technologies Used

These are the technologies used in this project:

Backend:

- Typescript
- NestJs
- Vitest

Frontend:

- React
- Bootstrap5

E2E Testing:

- Cypress

Database:

- MongoDB
- Mongoose

## Documentation

You can view backend Open API Specification by going into `/docs`
route. (`https://api.ems-site.ali-moradzade.work.gd/docs`)

## E2E Testing

You can run the end-to-end tests for this application as follows:

```bash
cd cypress-automation
npm run test
```

## Contribution

If you found any bugs, or you want to add a new feature, open a pull request, your branch name convention should match
this pattern:

- Bug: fix/backend/**name**; fix/front-end/**name**; fix/cypress/**name**
- Feature: feat/backend/**name**; feat/front-end/**name**; feat/cypress/**name**

## Application Screenshots

You can view application screenshots inside `.assets/screenshots` directory.

