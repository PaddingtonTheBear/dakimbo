# Dakimbo

![npm](https://img.shields.io/npm/v/dakimbo) 
![GitHub All Releases](https://img.shields.io/github/downloads/PaddingtonTheBear/dakimbo/total)

## What's Dakimbo?
Dakimbo is intended to be an all in one package for deploying a node server that simplifies entity model definitions for your project. You define your model in one place, and then use that model in both your frontend and backend. 

This is accomplished by making use of NodeJS + TypeORM for automatically handling the creation of your database tables, while at the same time the Nx Nrwl Monorepo pattern allows you to reference your TypeORM entity model definitions in the frontend. This reduces the pain of introducing new properties to your models as you only need to maintain one model!

The NodeJS server includes a data controller which acts generically by taking an entity name and handles the various persistence methods your might expect, so you don't need to constantly reinvent the wheel by writing a controller for each new entity for your application or system.

Also included is an [Angular Dynamic Angular CRUD Service](https://medium.com/@jeffgilliland/creating-a-dynamic-crud-service-in-angular-992229c9be56). This service makes use of your entity definitions to automatically provide the most common functions against your entities: Create, Read, Update and Delete. 

By simply defining your entity model in one file, you have created your database table, your NodeJS server can handle REST routes for that entity, and your frontend application can perform CRUD against it. All from one file!

### Why "Dakimbo"?
From Wikipedia: 

> "Arms akimbo" refers to standing with hands on hips, elbows pointing outward.

You can think of this project as the "elbows" that connect the body (your application) to the hips (your backend). 

The "D" refers to "data," as ultimatly everything revolves around data!

## Using Dakimbo
IN PROGRESS

### Install Dakimbo
```npm install dakimbo```

### Define your entities
Entities are defined in libs/data/src/lib/entities . After creating a TypeORM entity, add it to the ```_entity-map.ts``` file by importing and exporting it, as well as defining it in the ```entityMap``` object. This step is important as this file is where TypeORM looks to create your tables, and where your frontend maps can import the model definition (it's a barrel!);

## Developing Dakimbo
IN PROGRESS

#### Run the NodeJS Server
Ensure you have a .env definition in your base directory (see ./apps/dakimbo-server/.env-example).

Run the server with: ```npm run dev-dakimbo-server```