
[![npm](https://img.shields.io/npm/v/:package.svg)](https://www.npmjs.com/package/@paddingtonbear/dynamic-angular-crud)


# Dynamic Angular CRUD Service
This project is an attempt at creating a reusable CRUD (Create, Read, Update, Delete) data service in Angular to make it easier for performing CRUD operations against many different Database Tables.

# Running the Examples
Install the code with NPM:

```javascript
  npm install @paddingtonbear/dynamic-angular-crud
```

Then run json-server to generate a fake DB with REST endpoint:

```javascript
  json-server db.js
```

Finally, kick off the Angular dev server:

```javascript
  ng serve
```
Open your browser to http://localhost:3000/ and you should see the example page!

# TODO
1. Implement change strategy into "update" methods so that they only perform an update to the database ONLY if the front end model has changed.
2. Investigate issues with performing "fetch" based updates.
3. Add HTTP Headers to Fetch
