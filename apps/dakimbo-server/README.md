# dakimbo Server
This is an Express NodeJS server that is intended to be used as an application host that provides a REST interface for performing CRUD persistence against a database. 

This database connection is maintained via TypeORM for defining entities and performing CRUD operations. Each application will have unique entities that need to be dynamically added in to the database/entities folder following the TypeORM API.

A plugin system is used to add unique application functionality to the server while maintaining a baseline that is re-usable across apps.

## Environment Variables
You must create a .env at project root for configuring various server settings

## Developing the Server
```npm run dev-server```

## Production Server
See _dist