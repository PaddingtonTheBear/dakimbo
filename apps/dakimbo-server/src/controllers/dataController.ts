import { entityMap } from '@dakimbo/data';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IsNull, Repository } from 'typeorm';

import config from '../config';
import { Database } from './../database/database';

class DataController {
	static get = async (req: Request, res: Response) => {
		function transformQueryValue(value: string) {
			const lowerValue = value.toLowerCase();
			if (lowerValue === 'null') {
				return IsNull();
			} else {
				return value;
			}
		}

		const loadRelationships = async (
			repo: Repository<any>,
			relationships: string[],
			baseEntities?: any[]
		) => {
			if (!baseEntities) {
				baseEntities = await repo.find();
			}

			const promises = [];
			// loop through the desired relationships and push a generated repo.find with a single relationship onto our promises array
			relationships.forEach(relationship => {
				promises.push(repo.find({ select: ['id'], relations: [relationship] })); // only select id for lookup purposes
			});

			// Wait for all sub finds to complete and spread them into a res object
			const { ...res } = await Promise.all(promises);

			// Loop over every sub find result, find the "full entity" we're trying to build from our base entities,
			// and attach the corresponding related entites to it (not a "pure" function)
			Object.keys(res).forEach(i => {
				res[i].forEach(r => {
					const fullEntity = baseEntities.find(e => e.id === r.id);
					if (fullEntity) {
						const relationship = relationships[i];
						fullEntity[relationship] = r[relationship];
					}
				});
			});
		};

		const removeIgnoredAttrs = (entities: any[]) => {
			const ignoreAttrs = ['relationships', 'loadAfterCreate'];
			entities.forEach(e => ignoreAttrs.forEach(attr => delete e[attr]));
		};

		const entityName = req.params.entity;
		if (!entityName) {
			res.send('You must include the resource name to get these entities from!');
			return;
		}

		const { username } = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);

		try {
			const model = new entityMap[entityName];

			let repo = Database._connection.getRepository(entityName);
			let entities = [];
			const queries = Object.keys(req.query);

			if (queries && queries.length) {
				let query = {};
				let attrs = [];
				for (let i = 0, len = queries.length; i < len; i++) {
					const key = queries[i];
					const value = <any>req.query[key];

					if (key === 'attrs') {
						attrs = value.split(',');
					} else if (key.indexOf('.') >= 0) {
						const splitProp = key.split('.');
						const prop = splitProp[0],
							subProp = splitProp[1];
						query[prop] = {};
						query[prop][subProp] = transformQueryValue(value);
					} else {
						query[key] = transformQueryValue(value);
					}
				}

				const findOptions: any = {};
				if (query) {
					findOptions.where = query;
				}
				if (attrs && attrs.length) {
					findOptions.select = attrs;
				}

				entities = await repo.find(findOptions);
			} else {
				entities = await repo.find({});
			}

			if (model && model.relationships && model.relationships.length) {
				await loadRelationships(repo, model.relationships, entities);
			}

			removeIgnoredAttrs(entities);

			console.log(
				`GET: ${entityName}${
					Object.keys(req.query).length ? ' ' + JSON.stringify(req.query) : ''
				} | Returned ${entities.length} entities! USER: ${username}`
			);

			res.send(entities);
		} catch (e) {
			res.status(500).send(e);
			console.log(
				`GET FAILED: ${entityName} ${JSON.stringify(req.query)} | USER: ${username}`
			);
		}
	};

	static create = async (req: Request, res: Response) => {
		const entityName = req.params.entity;
		if (!entityName) {
			res.send('You must include the resource name to post this entity to!');
			return;
		}

		const objToCreate = req.body;

		const { username } = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);

		if (Array.isArray(objToCreate)) {
			objToCreate.forEach(o => {
				o.createUser = username;
				o.modifyUser = username;
			});
		} else {
			objToCreate.createUser = username;
			objToCreate.modifyUser = username;
		}

		try {
			const model = entityMap[entityName];

			if (model.preProcess) {
				await model.preProcess(objToCreate);
			}

			const repo = Database._connection.getRepository(entityName);
			let savedEntity = await repo.save(objToCreate);

			if (model.loadAfterCreate) {
				savedEntity = await repo.findOne(objToCreate.id);
			}
			if (model.postProcess) {
				await model.postProcess(savedEntity);
			}

			console.log(`POST: ${entityName} | USER: ${username}`);

			res.send(savedEntity);
		} catch (e) {
			res.status(500).send(e);
			console.log(`POST FAILED: ${entityName} | USER: ${username}`);
		}
	};

	static update = async (req: Request, res: Response) => {
		const entityName = req.params.entity;
		if (!entityName) {
			res.send('You must include the resource name to update this entity to!');
			return;
		}

		const objToUpdate = req.body;

		const { username } = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);

		if (Array.isArray(objToUpdate)) {
			objToUpdate.forEach(o => {
				o.modifyUser = username;
			});
		} else {
			objToUpdate.modifyUser = username;
			if (!objToUpdate.id) objToUpdate.id = req.params.id;
		}

		try {
			const model = entityMap[entityName];

			if (model.preProcess) {
				await model.preProcess(objToUpdate);
			}

			const repo = Database._connection.getRepository(entityName);
			const updatedEntity = await repo.save(objToUpdate);

			if (model.postProcess) {
				await model.postProcess(objToUpdate);
			}

			console.log(`PATCH: ${entityName} | ${objToUpdate.id} | USER: ${username}`);

			res.send(updatedEntity);
		} catch (e) {
			res.status(500).send(e);
			console.error(`PATCH FAILED: ${entityName} | ${objToUpdate.id} | USER: ${username}`);
		}
	};

	static delete = async (req: Request, res: Response) => {
		const entityName = req.params.entity;
		if (!entityName) {
			res.send('You must include the resource name to delete this entity against!');
			return;
		}

		const { username } = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);

		const idToDelete = req.params.id;

		try {
			const repo = Database._connection.getRepository(entityName);
			await repo.delete(idToDelete);

			console.log(`DELETE: ${entityName} | ${idToDelete} | USER: ${username}`);

			res.send({
				status: 'Delete Success!'
			});
		} catch (e) {
			res.status(500).send(e);
			console.error(`DELETE FAILED: ${entityName} | ${idToDelete} | USER: ${username}`);
		}
	};
}
export default DataController;
