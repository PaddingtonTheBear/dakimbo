# Dakimbo

## What's Dakimbo?
Dakimbo is intended to be an all in one package for deploying a node server that simplifies entity model definitions for your project. You define your model in one place, and then use that model in both your frontend and backend. 

This is accomplished by making use of NodeJS + TypeORM for automatically handling the creation of your database tables, while at the same time the Nx Nrwl Monorepo pattern allows you to reference your TypeORM entity model definitions in the frontend. This reduces the pain of introducing new properties to your models as you only need to maintain one model!

The NodeJS server includes a data controller which acts generically by taking an entity name and handles the various persistence methods your might expect, so you don't need to constantly reinvent the wheel by writing a controller for each new entity for your application or system.

Also included is an Angular "Dynamic CRUD Data Service." This service makes use of your entity definitions to automatically provide the most common functions against your entities: Create, Read, Update and Delete. 

By simply defining your entity model in one file, you have created your database table, your NodeJS server can handle REST routes for that entity, and your frontend application can perform CRUD against it. All from one file!

### Why "Dakimbo"?
From Wikipedia: 

> "Arms akimbo" refers to standing with hands on hips, elbows pointing outward.

You can think of this project as the "elbows" that connect the body (your application) to the hips (your backend). 

The "D" refers to "data," as ultimatly everything revolves around data!

## Using Dakimbo
IN PROGRESS

## Developing Dakimbo
IN PROGRESS