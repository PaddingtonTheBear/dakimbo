(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/dakimbo-server/src/config.ts":
/*!*******************************************!*\
  !*** ./apps/dakimbo-server/src/config.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dakimbo_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dakimbo/data */ "./libs/data/src/index.ts");

const isProd = process.env.IS_PROD === 'true';
const pathToEntities = isProd ? './database/entities/**/*.js' : './database/entities/**/*.ts';
const pathToMigrations = isProd ? './database/migrations/**/*.js' : './database/migrations/**/*.ts';
/* harmony default export */ __webpack_exports__["default"] = ({
    isProd: isProd,
    httpsOpts: {
    // Server SSL private key and certificate
    // key: fs.readFileSync(__dirname + '/security/dev-cert.key'),
    // cert: fs.readFileSync(__dirname + '/security/dev-cert.pem'),
    // issuer/CA certificate against which the client certificate will be
    // validated. A certificate that is not signed by a provided CA will be
    // rejected at the protocol layer.
    // ca: fs.readFileSync(__dirname + '/config/certs/ca-cert.pem'),
    // request a certificate, but don't necessarily reject connections from
    // clients providing an untrusted or no certificate. This lets us protect only
    // certain routes, or send a helpful error message to unauthenticated clients.
    // requestCert: true,
    // rejectUnauthorized: true,
    },
    dbOptions: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE || 'dakimbo-server',
        synchronize: true,
        logging: isProd ? false : false,
        entities: Object.values(_dakimbo_data__WEBPACK_IMPORTED_MODULE_0__["entityMap"])
        // entities: [path.join(__dirname, pathToEntities)],
        // migrations: [path.join(__dirname, pathToMigrations)],
        // migrationsDir: 'migration'
    },
    jwtSecret: process.env.JWT_SECRET || 'CHANGE_ME'
});


/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/authController.ts":
/*!***************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/authController.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dakimbo_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dakimbo/data */ "./libs/data/src/index.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _userController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./userController */ "./apps/dakimbo-server/src/controllers/userController.ts");







class AuthController {
}
AuthController.login = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
        res.status(400).send();
        console.log(`LOGIN: Username or Password not found; failed to log in!`);
        return;
    }
    //Get user from database
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["getRepository"])(_dakimbo_data__WEBPACK_IMPORTED_MODULE_1__["User"]);
    let user;
    try {
        user = yield userRepository.findOneOrFail({ where: { username } });
    }
    catch (error) {
        res.status(401).send();
        console.log(`LOGIN: User ${username} not found; failed to log in!`);
        return;
    }
    //Check if encrypted password match
    if (!_userController__WEBPACK_IMPORTED_MODULE_6__["default"].checkIfUnencryptedPasswordIsValid(password, user)) {
        res.status(401).send();
        console.log(`LOGIN: User ${user.username} wrong password; failed to log in!`);
        user.numFailedLogin++;
        yield userRepository.save(user); // increment num failed login counter
        return;
    }
    //Sign JWT, valid for 1 hour
    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__["sign"]({ userId: user.id, username: user.username }, _config__WEBPACK_IMPORTED_MODULE_5__["default"].jwtSecret, {
        expiresIn: '1h'
    });
    // Delete user pass
    delete user.password;
    console.log(`LOGIN: User ${user.username} successfully logged in!`);
    user.numSuccessfulLogin++;
    userRepository.save(user); // increment num successful login counter
    //Send the jwt in the response
    res.send(Object.assign({ jwt: token }, user));
});
AuthController.changePassword = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;
    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        res.status(400).send();
    }
    //Get user from the database
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["getRepository"])(_dakimbo_data__WEBPACK_IMPORTED_MODULE_1__["User"]);
    let user;
    try {
        user = yield userRepository.findOneOrFail(id);
    }
    catch (id) {
        res.status(401).send();
    }
    //Check if old password matchs
    if (!_userController__WEBPACK_IMPORTED_MODULE_6__["default"].checkIfUnencryptedPasswordIsValid(oldPassword, user)) {
        res.status(401).send();
        return;
    }
    //Validate the model (password length)
    user.password = newPassword;
    const errors = yield Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["validate"])(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    //Hash the new password and save
    _userController__WEBPACK_IMPORTED_MODULE_6__["default"].hashPassword(user);
    userRepository.save(user);
    res.status(204).send();
});
/* harmony default export */ __webpack_exports__["default"] = (AuthController);


/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/dataController.ts":
/*!***************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/dataController.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dakimbo_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dakimbo/data */ "./libs/data/src/index.ts");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../database/database */ "./apps/dakimbo-server/src/database/database.ts");






class DataController {
}
DataController.get = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    function transformQueryValue(value) {
        const lowerValue = value.toLowerCase();
        if (lowerValue === 'null') {
            return Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["IsNull"])();
        }
        else {
            return value;
        }
    }
    const loadRelationships = (repo, relationships, baseEntities) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        if (!baseEntities) {
            baseEntities = yield repo.find();
        }
        const promises = [];
        // loop through the desired relationships and push a generated repo.find with a single relationship onto our promises array
        relationships.forEach(relationship => {
            promises.push(repo.find({ select: ['id'], relations: [relationship] })); // only select id for lookup purposes
        });
        // Wait for all sub finds to complete and spread them into a res object
        const res = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(yield Promise.all(promises), []);
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
    });
    const removeIgnoredAttrs = (entities) => {
        const ignoreAttrs = ['relationships', 'loadAfterCreate'];
        entities.forEach(e => ignoreAttrs.forEach(attr => delete e[attr]));
    };
    const entityName = req.params.entity;
    if (!entityName) {
        res.send('You must include the resource name to get these entities from!');
        return;
    }
    const { username } = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_4__["default"].jwtSecret);
    try {
        const model = new _dakimbo_data__WEBPACK_IMPORTED_MODULE_1__["entityMap"][entityName];
        let repo = _database_database__WEBPACK_IMPORTED_MODULE_5__["Database"]._connection.getRepository(entityName);
        let entities = [];
        const queries = Object.keys(req.query);
        if (queries && queries.length) {
            let query = {};
            let attrs = [];
            for (let i = 0, len = queries.length; i < len; i++) {
                const key = queries[i];
                const value = req.query[key];
                if (key === 'attrs') {
                    attrs = value.split(',');
                }
                else if (key.indexOf('.') >= 0) {
                    const splitProp = key.split('.');
                    const prop = splitProp[0], subProp = splitProp[1];
                    query[prop] = {};
                    query[prop][subProp] = transformQueryValue(value);
                }
                else {
                    query[key] = transformQueryValue(value);
                }
            }
            const findOptions = {};
            if (query) {
                findOptions.where = query;
            }
            if (attrs && attrs.length) {
                findOptions.select = attrs;
            }
            entities = yield repo.find(findOptions);
        }
        else {
            entities = yield repo.find({});
        }
        if (model && model.relationships && model.relationships.length) {
            yield loadRelationships(repo, model.relationships, entities);
        }
        removeIgnoredAttrs(entities);
        console.log(`GET: ${entityName}${Object.keys(req.query).length ? ' ' + JSON.stringify(req.query) : ''} | Returned ${entities.length} entities! USER: ${username}`);
        res.send(entities);
    }
    catch (e) {
        res.status(500).send(e);
        console.log(`GET FAILED: ${entityName} ${JSON.stringify(req.query)} | USER: ${username}`);
    }
});
DataController.create = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const entityName = req.params.entity;
    if (!entityName) {
        res.send('You must include the resource name to post this entity to!');
        return;
    }
    const objToCreate = req.body;
    const { username } = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_4__["default"].jwtSecret);
    if (Array.isArray(objToCreate)) {
        objToCreate.forEach(o => {
            o.createUser = username;
            o.modifyUser = username;
        });
    }
    else {
        objToCreate.createUser = username;
        objToCreate.modifyUser = username;
    }
    try {
        const model = _dakimbo_data__WEBPACK_IMPORTED_MODULE_1__["entityMap"][entityName];
        if (model.preProcess) {
            yield model.preProcess(objToCreate);
        }
        const repo = _database_database__WEBPACK_IMPORTED_MODULE_5__["Database"]._connection.getRepository(entityName);
        let savedEntity = yield repo.save(objToCreate);
        if (model.loadAfterCreate) {
            savedEntity = yield repo.findOne(objToCreate.id);
        }
        if (model.postProcess) {
            yield model.postProcess(savedEntity);
        }
        console.log(`POST: ${entityName} | USER: ${username}`);
        res.send(savedEntity);
    }
    catch (e) {
        res.status(500).send(e);
        console.log(`POST FAILED: ${entityName} | USER: ${username}`);
    }
});
DataController.update = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const entityName = req.params.entity;
    if (!entityName) {
        res.send('You must include the resource name to update this entity to!');
        return;
    }
    const objToUpdate = req.body;
    const { username } = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_4__["default"].jwtSecret);
    if (Array.isArray(objToUpdate)) {
        objToUpdate.forEach(o => {
            o.modifyUser = username;
        });
    }
    else {
        objToUpdate.modifyUser = username;
        if (!objToUpdate.id)
            objToUpdate.id = req.params.id;
    }
    try {
        const model = _dakimbo_data__WEBPACK_IMPORTED_MODULE_1__["entityMap"][entityName];
        if (model.preProcess) {
            yield model.preProcess(objToUpdate);
        }
        const repo = _database_database__WEBPACK_IMPORTED_MODULE_5__["Database"]._connection.getRepository(entityName);
        const updatedEntity = yield repo.save(objToUpdate);
        if (model.postProcess) {
            yield model.postProcess(objToUpdate);
        }
        console.log(`PATCH: ${entityName} | ${objToUpdate.id} | USER: ${username}`);
        res.send(updatedEntity);
    }
    catch (e) {
        res.status(500).send(e);
        console.error(`PATCH FAILED: ${entityName} | ${objToUpdate.id} | USER: ${username}`);
    }
});
DataController.delete = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const entityName = req.params.entity;
    if (!entityName) {
        res.send('You must include the resource name to delete this entity against!');
        return;
    }
    const { username } = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_4__["default"].jwtSecret);
    const idToDelete = req.params.id;
    try {
        const repo = _database_database__WEBPACK_IMPORTED_MODULE_5__["Database"]._connection.getRepository(entityName);
        yield repo.delete(idToDelete);
        console.log(`DELETE: ${entityName} | ${idToDelete} | USER: ${username}`);
        res.send({
            status: 'Delete Success!'
        });
    }
    catch (e) {
        res.status(500).send(e);
        console.error(`DELETE FAILED: ${entityName} | ${idToDelete} | USER: ${username}`);
    }
});
/* harmony default export */ __webpack_exports__["default"] = (DataController);


/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/metricsController.ts":
/*!******************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/metricsController.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../database/database */ "./apps/dakimbo-server/src/database/database.ts");




class MetricsController {
}
MetricsController.getMetricsFor = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const { username } = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_2__["default"].jwtSecret);
    const metricToFind = req.params.metricName;
    try {
        const metricRepo = _database_database__WEBPACK_IMPORTED_MODULE_3__["Database"]._connection.getRepository(metricToFind);
        const metrics = yield metricRepo.find();
        console.log(`METRICS FETCHED: ${metricToFind} --- FOUND: ${metrics.length} | USER: ${username}`);
        res.send(metrics);
    }
    catch (error) {
        res.status(500).send(error);
        console.log(`FAILED: Metrics fetch for ${metricToFind}`);
    }
});
/* harmony default export */ __webpack_exports__["default"] = (MetricsController);


/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/userController.ts":
/*!***************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/userController.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dakimbo_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dakimbo/data */ "./libs/data/src/index.ts");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");







class UserController {
    static hashPassword(userEntity) {
        userEntity.password = bcryptjs__WEBPACK_IMPORTED_MODULE_2__["hashSync"](userEntity.password, 8);
    }
    static checkIfUnencryptedPasswordIsValid(unencryptedPassword, userEntity) {
        return bcryptjs__WEBPACK_IMPORTED_MODULE_2__["compareSync"](unencryptedPassword, userEntity.password);
    }
}
UserController.listAll = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    //Get users from database
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["getRepository"])(_dakimbo_data__WEBPACK_IMPORTED_MODULE_1__["User"]);
    const users = yield userRepository.find({
        select: ['id', 'username', 'role', 'email', 'createDate'] //We dont want to send the passwords on response
    });
    //Send the users object
    res.send(users);
});
UserController.getOneById = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    //Get the ID from the url
    const id = +req.params.id;
    //Get the user from database
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["getRepository"])(_dakimbo_data__WEBPACK_IMPORTED_MODULE_1__["User"]);
    try {
        const user = yield userRepository.findOneOrFail(id, {
            select: ['id', 'username', 'role'] //We dont want to send the password on response
        });
        res.status(201).send(user);
    }
    catch (error) {
        res.status(404).send('User not found');
    }
});
UserController.newUser = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    //Get parameters from the body
    let { username, password, email, role } = req.body;
    let user = new _dakimbo_data__WEBPACK_IMPORTED_MODULE_1__["User"]();
    user.username = username;
    user.password = password;
    user.email = email;
    user.role = role;
    // const { adminUser } = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);
    //Validade if the parameters are ok
    const errors = yield Object(class_validator__WEBPACK_IMPORTED_MODULE_3__["validate"])(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    //Hash the password, to securely store on DB
    UserController.hashPassword(user);
    //Try to save. If fails, the username is already in use
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["getRepository"])(_dakimbo_data__WEBPACK_IMPORTED_MODULE_1__["User"]);
    try {
        yield userRepository.save(user);
    }
    catch (e) {
        res.status(409).send('Username already in use!');
        return;
    }
    delete user.password;
    //If all ok, send 201 response
    console.log(`CREATE USER: ${user.username}`);
    res.status(201).send(user);
});
UserController.editUser = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    //Get the ID from the url
    const id = req.params.id;
    //Get values from the body
    const { username, password, role } = req.body;
    const { adminUser } = jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_6__["default"].jwtSecret);
    //Try to find user on database
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["getRepository"])(_dakimbo_data__WEBPACK_IMPORTED_MODULE_1__["User"]);
    let user;
    try {
        user = yield userRepository.findOneOrFail(id);
    }
    catch (error) {
        //If not found, send a 404 response
        res.status(404).send('User not found');
        return;
    }
    //Validate the new values on model
    user.username = username;
    user.role = role;
    if (password) {
        user.password = password;
        UserController.hashPassword(user);
    }
    const errors = yield Object(class_validator__WEBPACK_IMPORTED_MODULE_3__["validate"])(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    //Try to save, if fails, that means username already in use
    try {
        yield userRepository.save(user);
    }
    catch (e) {
        res.status(409).send('username already in use');
        return;
    }
    //After all send a 204 (no content, but accepted) response
    console.log(`EDIT USER: ${user.username} | BY ADMIN: ${adminUser}`);
    res.status(204).send();
});
UserController.deleteUser = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    //Get the ID from the url
    const id = req.params.id;
    const { adminUser } = jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_6__["default"].jwtSecret);
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["getRepository"])(_dakimbo_data__WEBPACK_IMPORTED_MODULE_1__["User"]);
    let user;
    try {
        user = yield userRepository.findOneOrFail(id);
    }
    catch (error) {
        res.status(404).send('User not found');
        return;
    }
    userRepository.delete(id);
    //After all send a 204 (no content, but accepted) response
    console.log(`DELETE USER: ${user.username} | BY ADMIN: ${adminUser}`);
    res.status(204).send();
});
UserController.getCurrentUser = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    // Get the jwt token from the head
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.includes('Bearer')) {
        res.status(408).send('No Authorization Header or Bearer token presented!');
        return;
    }
    const token = authHeader.split('Bearer')[1].trim();
    let jwtPayload;
    // Try to validate the token and get data
    try {
        jwtPayload = jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__["verify"](token, _config__WEBPACK_IMPORTED_MODULE_6__["default"].jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        // If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }
    // The token is valid for 1 hour
    // We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["getRepository"])(_dakimbo_data__WEBPACK_IMPORTED_MODULE_1__["User"]);
    let user;
    try {
        user = yield userRepository.findOneOrFail(userId);
    }
    catch (error) {
        res.status(404).send('User not found');
        return;
    }
    delete user.password;
    res.status(201).send(user);
});
/* harmony default export */ __webpack_exports__["default"] = (UserController);


/***/ }),

/***/ "./apps/dakimbo-server/src/database/database.ts":
/*!******************************************************!*\
  !*** ./apps/dakimbo-server/src/database/database.ts ***!
  \******************************************************/
/*! exports provided: Database */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Database", function() { return Database; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);


class Database {
    constructor() { }
    connect(dbOptions) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            Database._dbOptions = dbOptions;
            try {
                console.log(`Connecting to ${Database._dbOptions.type} Database: ${Database._dbOptions.database} at ${Database._dbOptions.host}:${Database._dbOptions.port} with user: ${Database._dbOptions.username}`);
                Database._connection = yield Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["createConnection"])(Database._dbOptions);
                yield this.runMigrations();
                console.log(`Connection to database established!`);
            }
            catch (e) {
                console.log(`Error Connecting to ${Database._dbOptions.host}:${Database._dbOptions.port}\n`, e);
            }
        });
    }
    runMigrations() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const migrations = [];
            if (migrations.length) {
                console.log(`Running migrations...`);
                yield Promise.all(migrations);
                console.log(`Migrations finished!`);
            }
        });
    }
}


/***/ }),

/***/ "./apps/dakimbo-server/src/main.ts":
/*!*****************************************!*\
  !*** ./apps/dakimbo-server/src/main.ts ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reflect-metadata */ "reflect-metadata");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! compression */ "compression");
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! helmet */ "helmet");
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./database/database */ "./apps/dakimbo-server/src/database/database.ts");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes */ "./apps/dakimbo-server/src/routes/index.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./config */ "./apps/dakimbo-server/src/config.ts");

__webpack_require__(/*! ./utilities/logStamp */ "./apps/dakimbo-server/src/utilities/logStamp.ts");
__webpack_require__(/*! dotenv */ "dotenv").config();









(() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const db = new _database_database__WEBPACK_IMPORTED_MODULE_7__["Database"]();
    yield db.connect(_config__WEBPACK_IMPORTED_MODULE_9__["default"].dbOptions);
    const app = express__WEBPACK_IMPORTED_MODULE_5___default()();
    const port = process.env.port || 1337;
    // MIDDLEWARE
    app.use(cors__WEBPACK_IMPORTED_MODULE_4___default()());
    app.use(helmet__WEBPACK_IMPORTED_MODULE_6___default()());
    app.use(compression__WEBPACK_IMPORTED_MODULE_3___default()());
    app.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({ extended: false }));
    app.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());
    app.use(express__WEBPACK_IMPORTED_MODULE_5___default.a.static(__dirname + '/public'));
    app.use('/', _routes__WEBPACK_IMPORTED_MODULE_8__["default"]);
    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });
    const server = app.listen(port, () => {
        return console.log(`Server is listening on ${port}`);
    });
    server.on('error', console.error);
}))();


/***/ }),

/***/ "./apps/dakimbo-server/src/middlewares/checkJwt.ts":
/*!*********************************************************!*\
  !*** ./apps/dakimbo-server/src/middlewares/checkJwt.ts ***!
  \*********************************************************/
/*! exports provided: checkJwt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkJwt", function() { return checkJwt; });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");


const checkJwt = (req, res, next) => {
    // Get the jwt token from the head
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.includes('Bearer')) {
        res.status(408).send('No Authorization Header or Bearer token presented!');
        return;
    }
    const token = authHeader.split('Bearer')[1].trim();
    let jwtPayload;
    // Try to validate the token and get data
    try {
        jwtPayload = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__["verify"](token, _config__WEBPACK_IMPORTED_MODULE_1__["default"].jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        // If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }
    // The token is valid for 1 hour
    // We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const newToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__["sign"]({ userId, username }, _config__WEBPACK_IMPORTED_MODULE_1__["default"].jwtSecret, {
        expiresIn: '1h'
    });
    res.setHeader('token', newToken);
    // Call the next middleware or controller
    next();
};


/***/ }),

/***/ "./apps/dakimbo-server/src/middlewares/checkRole.ts":
/*!**********************************************************!*\
  !*** ./apps/dakimbo-server/src/middlewares/checkRole.ts ***!
  \**********************************************************/
/*! exports provided: checkRole */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkRole", function() { return checkRole; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dakimbo_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dakimbo/data */ "./libs/data/src/index.ts");



const checkRole = (roles) => {
    return (req, res, next) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        // Get the user ID from previous midleware
        const id = res.locals.jwtPayload.userId;
        // Get user role from the database
        const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["getRepository"])(_dakimbo_data__WEBPACK_IMPORTED_MODULE_2__["User"]);
        let user;
        try {
            user = yield userRepository.findOneOrFail(id);
        }
        catch (id) {
            res.status(401).send();
        }
        // Check if array of authorized roles includes the user's role
        if (roles.indexOf(user.role) > -1)
            next();
        else
            res.status(401).send();
    });
};


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/auth.ts":
/*!************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/auth.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_authController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/authController */ "./apps/dakimbo-server/src/controllers/authController.ts");
/* harmony import */ var _middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/checkJwt */ "./apps/dakimbo-server/src/middlewares/checkJwt.ts");



const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
//Login route
router.post('/login', _controllers_authController__WEBPACK_IMPORTED_MODULE_1__["default"].login);
//Change my password
router.post('/change-password', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"]], _controllers_authController__WEBPACK_IMPORTED_MODULE_1__["default"].changePassword);
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/data.ts":
/*!************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/data.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../middlewares/checkJwt */ "./apps/dakimbo-server/src/middlewares/checkJwt.ts");
/* harmony import */ var _middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/checkRole */ "./apps/dakimbo-server/src/middlewares/checkRole.ts");
/* harmony import */ var _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/dataController */ "./apps/dakimbo-server/src/controllers/dataController.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");





const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
if (_config__WEBPACK_IMPORTED_MODULE_4__["default"].isProd) {
    router.get('/:entity', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].get);
    router.post('/:entity', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].create);
    router.patch('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].update);
    router.put('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].update);
    router.delete('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superamdin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].delete);
}
else {
    router.get('/:entity', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].get);
    router.post('/:entity', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].create);
    router.patch('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].update);
    router.put('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].update);
    router.delete('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].delete);
}
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/index.ts":
/*!*************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/index.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth */ "./apps/dakimbo-server/src/routes/auth.ts");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user */ "./apps/dakimbo-server/src/routes/user.ts");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data */ "./apps/dakimbo-server/src/routes/data.ts");
/* harmony import */ var _metrics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./metrics */ "./apps/dakimbo-server/src/routes/metrics.ts");





const routes = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
routes.use('/auth', _auth__WEBPACK_IMPORTED_MODULE_1__["default"]);
routes.use('/user', _user__WEBPACK_IMPORTED_MODULE_2__["default"]);
routes.use('/data', _data__WEBPACK_IMPORTED_MODULE_3__["default"]);
routes.use('/metrics', _metrics__WEBPACK_IMPORTED_MODULE_4__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (routes);


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/metrics.ts":
/*!***************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/metrics.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../middlewares/checkJwt */ "./apps/dakimbo-server/src/middlewares/checkJwt.ts");
/* harmony import */ var _middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/checkRole */ "./apps/dakimbo-server/src/middlewares/checkRole.ts");
/* harmony import */ var _controllers_metricsController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/metricsController */ "./apps/dakimbo-server/src/controllers/metricsController.ts");




const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
// Get specific metric
router.get('/:metricName', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin'])], _controllers_metricsController__WEBPACK_IMPORTED_MODULE_3__["default"].getMetricsFor);
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/user.ts":
/*!************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/user.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_userController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/userController */ "./apps/dakimbo-server/src/controllers/userController.ts");
/* harmony import */ var _middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/checkJwt */ "./apps/dakimbo-server/src/middlewares/checkJwt.ts");
/* harmony import */ var _middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../middlewares/checkRole */ "./apps/dakimbo-server/src/middlewares/checkRole.ts");




const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
//Get all users
router.get('/', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['admin'])], _controllers_userController__WEBPACK_IMPORTED_MODULE_1__["default"].listAll);
// Get one user
router.get('/:id([0-9]+)', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['admin'])], _controllers_userController__WEBPACK_IMPORTED_MODULE_1__["default"].getOneById);
//Create a new user
router.post('/', _controllers_userController__WEBPACK_IMPORTED_MODULE_1__["default"].newUser);
//Edit one user
router.patch('/:id([0-9]+)', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['admin'])], _controllers_userController__WEBPACK_IMPORTED_MODULE_1__["default"].editUser);
//Delete one user
router.delete('/:id([0-9]+)', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['admin'])], _controllers_userController__WEBPACK_IMPORTED_MODULE_1__["default"].deleteUser);
// Current User
router.get('/me', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"]], _controllers_userController__WEBPACK_IMPORTED_MODULE_1__["default"].getCurrentUser);
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/dakimbo-server/src/utilities/logStamp.ts":
/*!*******************************************************!*\
  !*** ./apps/dakimbo-server/src/utilities/logStamp.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const log = console.log;
console.log = function () {
    const firstParameter = arguments[0];
    const otherParameters = Array.prototype.slice.call(arguments, 1);
    log.apply(console, [`${dateFormat()} ${firstParameter}`.concat(otherParameters)]);
};
const error = console.error;
console.error = function () {
    const firstParameter = arguments[0];
    const otherParameters = Array.prototype.slice.call(arguments, 1);
    error.apply(console, [`${dateFormat()} ${firstParameter}`.concat(otherParameters)]);
};
const dateFormat = () => {
    return `[\x1b[34m${new Date().toISOString()}\x1b[0m]`;
};


/***/ }),

/***/ "./libs/data/src/index.ts":
/*!********************************!*\
  !*** ./libs/data/src/index.ts ***!
  \********************************/
/*! exports provided: DataServiceModule, DataService, entityMap, User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_services_data_data_service_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/services/data/data-service.module */ "./libs/data/src/lib/services/data/data-service.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataServiceModule", function() { return _lib_services_data_data_service_module__WEBPACK_IMPORTED_MODULE_0__["DataServiceModule"]; });

/* harmony import */ var _lib_services_data_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/services/data/data.service */ "./libs/data/src/lib/services/data/data.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return _lib_services_data_data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]; });

/* harmony import */ var _lib_entities_entity_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/entities/_entity-map */ "./libs/data/src/lib/entities/_entity-map.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "entityMap", function() { return _lib_entities_entity_map__WEBPACK_IMPORTED_MODULE_2__["entityMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _lib_entities_entity_map__WEBPACK_IMPORTED_MODULE_2__["User"]; });

// SERVICES


/**
 * ENTITIES
 */



/***/ }),

/***/ "./libs/data/src/lib/entities/_entity-map.ts":
/*!***************************************************!*\
  !*** ./libs/data/src/lib/entities/_entity-map.ts ***!
  \***************************************************/
/*! exports provided: entityMap, User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "entityMap", function() { return entityMap; });
/* harmony import */ var _auth_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth/user */ "./libs/data/src/lib/entities/auth/user.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _auth_user__WEBPACK_IMPORTED_MODULE_0__["User"]; });


const entityMap = {
    // AUTH
    User: _auth_user__WEBPACK_IMPORTED_MODULE_0__["User"]
};



/***/ }),

/***/ "./libs/data/src/lib/entities/auth/user.ts":
/*!*************************************************!*\
  !*** ./libs/data/src/lib/entities/auth/user.ts ***!
  \*************************************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base */ "./libs/data/src/lib/entities/base.ts");




let User = class User extends _base__WEBPACK_IMPORTED_MODULE_3__["BaseModel"] {
    constructor(props) {
        super(props);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_1__["Length"])(4, 20),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], User.prototype, "username", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_1__["Length"])(4, 100),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], User.prototype, "password", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Column"])({
        length: 255
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], User.prototype, "email", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_1__["IsNotEmpty"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], User.prototype, "role", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Column"])({
        nullable: true,
        default: 0
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], User.prototype, "numSuccessfulLogin", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Column"])({
        nullable: true,
        default: 0
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], User.prototype, "numFailedLogin", void 0);
User = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Entity"])({
        name: 'auth_user',
        orderBy: {
            username: 'ASC'
        }
    }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Unique"])(['username']),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [User])
], User);



/***/ }),

/***/ "./libs/data/src/lib/entities/base.ts":
/*!********************************************!*\
  !*** ./libs/data/src/lib/entities/base.ts ***!
  \********************************************/
/*! exports provided: BaseModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseModel", function() { return BaseModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
var _a, _b;


class BaseModel {
    constructor(props) {
        if (!props)
            return;
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["PrimaryGeneratedColumn"])('uuid'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], BaseModel.prototype, "id", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["VersionColumn"])({
        nullable: true
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], BaseModel.prototype, "version", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["CreateDateColumn"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseModel.prototype, "createDate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["UpdateDateColumn"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseModel.prototype, "modifyDate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({
        nullable: true
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], BaseModel.prototype, "createUser", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({
        nullable: true
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], BaseModel.prototype, "modifyUser", void 0);


/***/ }),

/***/ "./libs/data/src/lib/services/data/_delete.ts":
/*!****************************************************!*\
  !*** ./libs/data/src/lib/services/data/_delete.ts ***!
  \****************************************************/
/*! exports provided: DataDelete */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataDelete", function() { return DataDelete; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "@angular/common/http");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_angular_common_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "@angular/core");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_angular_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__);
var _a;




let DataDelete = class DataDelete {
    constructor(http) {
        this.http = http;
    }
    setDataService(ds) {
        this.DS = ds;
    }
    /**
     * Delete a front end object fron the database
     * @param model The interface / class to construct the query against and build response objects from
     * @param objToDelete The front end object to be deleted in the DB
     */
    delete(model, objToDelete) {
        if (this.DS.isOptimistic) {
            // Optimistically Remove the object to delete from the front end cache by filtering out everything that doesn't have the same id
            this.DS.cache[this.DS.getModelName(model)] = this.DS.cache[this.DS.getModelName(model)].filter(el => el.id !== (objToDelete.id || objToDelete));
        }
        return this.http
            .delete(`${this.DS.apiEndpoint}/${this.DS.getModelName(model)}/${objToDelete.id || objToDelete}`)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((res) => {
            if (!this.DS.isOptimistic) {
                // wait for the server response before modifying the front end
                this.DS.cache[this.DS.getModelName(model)] = this.DS.cache[model.name || model].filter(el => el.id !== objToDelete.id);
            }
        }));
    }
    cacheAndNotifyDelete(model, objToDelete) {
        if (!this.DS.cache[this.DS.getModelName(model)])
            return;
        // Remove the object to delete from the front end cache by filtering out everything that doesn't have the same id
        this.DS.cache[this.DS.getModelName(model)] = this.DS.cache[this.DS.getModelName(model)].filter(el => el.id !== (objToDelete.id || objToDelete));
        this.DS.subjectMap[this.DS.getModelName(model)].next(this.DS.cache[this.DS.getModelName(model)]);
        this.DS.loadingMap[this.DS.getModelName(model)].next(false);
    }
};
DataDelete = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] !== "undefined" && _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]) === "function" ? _a : Object])
], DataDelete);



/***/ }),

/***/ "./libs/data/src/lib/services/data/_read.ts":
/*!**************************************************!*\
  !*** ./libs/data/src/lib/services/data/_read.ts ***!
  \**************************************************/
/*! exports provided: DataRead */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataRead", function() { return DataRead; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "@angular/common/http");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_angular_common_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "@angular/core");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_angular_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _interceptors_GenericModelHttpParams__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interceptors/GenericModelHttpParams */ "./libs/data/src/lib/services/data/interceptors/GenericModelHttpParams.ts");
var _a;





let DataRead = class DataRead {
    constructor(http) {
        this.http = http;
    }
    setDataService(ds) {
        this.DS = ds;
    }
    /**
     * Using a model interface's table definition, do a HTTP get
     * @param model The interface / class to construct the query against and build response objects from
     * @param query A limiting query to apply to the get. Expects an object of type URLSearchParams to append to the read, or a simple string
     */
    read(model, query) {
        return this.http
            .get(`${this.DS.apiEndpoint}/${this.DS.getModelName(model)}${query ? '?' + this.createSearchParams(query) : ''}`, {
            params: new _interceptors_GenericModelHttpParams__WEBPACK_IMPORTED_MODULE_4__["GenericModelHttpParams"](model)
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((res) => {
            this.cacheAndNotifyRead(model, res);
        }));
    }
    readExternal(queryUrl) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let url = queryUrl;
            return this.http.get(url);
        });
    }
    createSearchParams(query) {
        if (!query)
            return '';
        let newParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
        if (typeof query === 'string') {
            let searchParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
            const splitQuery = query.split('&');
            splitQuery.forEach(param => {
                const keyValPair = param.split('=');
                searchParams = searchParams.append(keyValPair[0], keyValPair[1]);
            });
            newParams = searchParams;
        }
        else if (query instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]) {
            newParams = query;
        }
        else if (query instanceof Array) {
            console.log(query);
        }
        else {
            // Parse object into HttpParams
            Object.keys(query).forEach(key => {
                const queryVals = query[key];
                if (Array.isArray(queryVals)) {
                    queryVals.forEach(qv => (newParams = newParams.append(key, qv)));
                }
                else {
                    newParams = newParams.append(key, queryVals);
                }
            });
        }
        return newParams.toString();
    }
    cacheAndNotifyRead(model, res) {
        // Reset the cache entry since we are getting new results
        this.DS.cache[this.DS.getModelName(model)] = [];
        if (res instanceof Array) {
            res.forEach((el) => {
                this.DS.cache[this.DS.getModelName(model)].push(Object.assign({}, el));
            });
        }
        // Update Frontend
        this.DS.subjectMap[this.DS.getModelName(model)].next(this.DS.cache[this.DS.getModelName(model)]);
    }
};
DataRead = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] !== "undefined" && _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]) === "function" ? _a : Object])
], DataRead);



/***/ }),

/***/ "./libs/data/src/lib/services/data/_save.ts":
/*!**************************************************!*\
  !*** ./libs/data/src/lib/services/data/_save.ts ***!
  \**************************************************/
/*! exports provided: DataSave */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSave", function() { return DataSave; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "@angular/common/http");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_angular_common_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "@angular/core");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_angular_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__);
var _a;





var Action;
(function (Action) {
    Action["CREATE"] = "Create";
    Action["UPDATE"] = "Update";
})(Action || (Action = {}));
let DataSave = class DataSave {
    constructor(http) {
        this.http = http;
    }
    setDataService(ds) {
        this.DS = ds;
    }
    /**
     * Save an object to the database; saving will determine if the object is new (doesn't have an id) or needs to be updated. This will determine whether or not to POST or PATCH the object.
     * It will also detect if the incoming objToSave is an array, indicating we have a bulk update scenario, so it will split this into a create and update call with array.
     * Special care needs to be taken to ensure the front end object receives the new id from the backend
     * @param model The interface / class to construct the query against and build response objects from
     * @param objToSave The front end object to be saved
     */
    save(model, objToSave) {
        const url = `${this.DS.apiEndpoint}/${this.DS.getModelName(model)}${objToSave.id ? '/' + objToSave.id : ''}`;
        if (Array.isArray(objToSave)) {
            // BULK SAVE
            objToSave.forEach((o, i) => (o._saveId = i));
            const toCreate = [], toUpdate = [];
            objToSave.forEach(o => {
                o.id ? toUpdate.push(o) : toCreate.push(o);
            });
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["forkJoin"])(this.http.post(url, JSON.stringify(toCreate)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((res) => {
                Object.assign(objToSave, res);
                this.cacheAndNotifySaved(model, objToSave, Action.CREATE);
                return res;
            })), this.http.put(url, JSON.stringify(toUpdate)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((res) => {
                Object.assign(objToSave, res);
                this.cacheAndNotifySaved(model, objToSave, Action.UPDATE);
                return res;
            }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((res) => {
                (res.results || res || []).forEach(o => {
                    const objIdSet = objToSave.find(os => os._saveId === o._saveId);
                    if (objIdSet)
                        objIdSet.id = o.id;
                });
                objToSave.forEach(o => delete o._saveId);
                this.cacheAndNotifySaved(model, objToSave, Action.CREATE); // TODO: This won't work, need to handle array situation!
                return objToSave;
            }));
        }
        else {
            if (objToSave && objToSave.id) {
                return this.http.put(url, objToSave).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((res) => {
                    Object.assign(objToSave, res);
                    this.cacheAndNotifySaved(model, objToSave, Action.UPDATE);
                    return res;
                }));
            }
            else {
                return this.http.post(url, objToSave).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((res) => {
                    Object.assign(objToSave, res);
                    this.cacheAndNotifySaved(model, objToSave, Action.CREATE);
                    return res;
                }));
            }
        }
    }
    cacheAndNotifySaved(model, newModelObj, action) {
        switch (action) {
            case Action.CREATE:
                // Append the new object into the front end cache
                this.DS.cache[this.DS.getModelName(model)].push(Object.assign({}, newModelObj));
                break;
            case Action.UPDATE:
                // Update the object in the front end cache
                let foundObj = this.DS.cache[this.DS.getModelName(model)].find(entity => entity.id === newModelObj.id);
                if (foundObj)
                    foundObj = Object.assign(Object.assign({}, foundObj), newModelObj);
                break;
            default:
                break;
        }
        this.DS.subjectMap[this.DS.getModelName(model)].next(this.DS.cache[this.DS.getModelName(model)]);
        this.DS.loadingMap[this.DS.getModelName(model)].next(false);
    }
};
DataSave = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] !== "undefined" && _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]) === "function" ? _a : Object])
], DataSave);



/***/ }),

/***/ "./libs/data/src/lib/services/data/data-service-config.interface.ts":
/*!**************************************************************************!*\
  !*** ./libs/data/src/lib/services/data/data-service-config.interface.ts ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./libs/data/src/lib/services/data/data-service.module.ts":
/*!****************************************************************!*\
  !*** ./libs/data/src/lib/services/data/data-service.module.ts ***!
  \****************************************************************/
/*! exports provided: DataServiceModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataServiceModule", function() { return DataServiceModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "@angular/common");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_angular_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "@angular/common/http");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_angular_common_http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "@angular/core");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_angular_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _delete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_delete */ "./libs/data/src/lib/services/data/_delete.ts");
/* harmony import */ var _read__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_read */ "./libs/data/src/lib/services/data/_read.ts");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_save */ "./libs/data/src/lib/services/data/_save.ts");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./data.service */ "./libs/data/src/lib/services/data/data.service.ts");
/* harmony import */ var _interceptors_header_interceptor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./interceptors/header.interceptor */ "./libs/data/src/lib/services/data/interceptors/header.interceptor.ts");
/* harmony import */ var _interceptors_loading_interceptor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./interceptors/loading.interceptor */ "./libs/data/src/lib/services/data/interceptors/loading.interceptor.ts");
var DataServiceModule_1;










const configToken = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["InjectionToken"]('dataServiceConfig');
let DataServiceModule = DataServiceModule_1 = class DataServiceModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('DataServiceModule is already loaded. Import it in the AppModule only.');
        }
    }
    static forRoot(dsConfig) {
        return {
            ngModule: DataServiceModule_1,
            providers: [
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"], useClass: _interceptors_loading_interceptor__WEBPACK_IMPORTED_MODULE_9__["LoadingInterceptor"], multi: true },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"], useClass: _interceptors_header_interceptor__WEBPACK_IMPORTED_MODULE_8__["DataServiceHeaderInterceptor"], multi: true },
                { provide: 'dsConfig', useValue: dsConfig },
                _data_service__WEBPACK_IMPORTED_MODULE_7__["DataService"],
                _save__WEBPACK_IMPORTED_MODULE_6__["DataSave"],
                _read__WEBPACK_IMPORTED_MODULE_5__["DataRead"],
                _delete__WEBPACK_IMPORTED_MODULE_4__["DataDelete"]
            ]
        };
    }
};
DataServiceModule = DataServiceModule_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        declarations: [],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["SkipSelf"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [DataServiceModule])
], DataServiceModule);



/***/ }),

/***/ "./libs/data/src/lib/services/data/data.service.ts":
/*!*********************************************************!*\
  !*** ./libs/data/src/lib/services/data/data.service.ts ***!
  \*********************************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "@angular/core");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_angular_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _entities_entity_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../entities/_entity-map */ "./libs/data/src/lib/entities/_entity-map.ts");
/* harmony import */ var _delete__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_delete */ "./libs/data/src/lib/services/data/_delete.ts");
/* harmony import */ var _read__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_read */ "./libs/data/src/lib/services/data/_read.ts");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_save */ "./libs/data/src/lib/services/data/_save.ts");
/* harmony import */ var _data_service_config_interface__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./data-service-config.interface */ "./libs/data/src/lib/services/data/data-service-config.interface.ts");
/* harmony import */ var _data_service_config_interface__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_data_service_config_interface__WEBPACK_IMPORTED_MODULE_8__);
var _a, _b, _c, _d;









let DataService = class DataService {
    constructor(DSV, DR, DD, config) {
        this.DSV = DSV;
        this.DR = DR;
        this.DD = DD;
        // Determine whether or not to be optimstic with our Http calls in terms of updating the front end. True means update the front end right away despite what the server does.
        this.isOptimistic = true;
        // A simple object that is used a cache for any data that has been loaded into the system
        this.cache = {};
        // A map of TableName => Subject for external components to subscribe to, in order to be notified of updates to that table's data
        this.subjectMap = {};
        // A map of TableName => any (model type) for external components to set and subscribe to get a selected entity
        this.activeMap = {};
        // A map of TableName => Boolean to components to use for displaying a loading icon when that table's data is being loaded or modified
        this.loadingMap = {};
        this.DSV.setDataService(this);
        this.DR.setDataService(this);
        this.DD.setDataService(this);
        if (config) {
            this.setupDataService(config);
        }
    }
    setupDataService(config) {
        this.apiEndpoint = config.apiEndpoint;
        this.tables = Object.assign(Object.assign({}, config.tables), _entities_entity_map__WEBPACK_IMPORTED_MODULE_4__["entityMap"]);
        this.setupLocalProps();
    }
    setupLocalProps() {
        try {
            // TODO: Figure out how to make a subject with the correct TS model based on the table name
            Object.keys(this.tables).forEach((table) => {
                this.addTableToLocalProps(table);
            });
        }
        catch (e) {
            console.error(`Tables in DataService was null!`, e);
        }
    }
    addTableToLocalProps(table) {
        if (!table)
            return;
        this.loadingMap[table] = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        this.cache[table] = [];
        this.subjectMap[table] = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.activeMap[table] = null;
    }
    /**
     * PUBLIC API
     */
    getModelName(model) {
        if (model && model.name) {
            return model.name;
        }
        else {
            return model;
        }
    }
    // SAVE
    save(model, objToSave) {
        if (!model)
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])();
        else
            return this.DSV.save(model, objToSave);
    }
    // READ
    read(model, query) {
        if (!model)
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])();
        else
            return this.DR.read(model, query);
    }
    readExternal(url) {
        return this.DR.readExternal(url);
    }
    // DELETE
    delete(model, objToDelete) {
        if (!model)
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])();
        return this.DD.delete(model, objToDelete);
    }
    // SELECTORS
    selectAll(model) {
        return this.subjectMap[this.getModelName(model)];
    }
    selectAllValues(model) {
        return this.cache[this.getModelName(model)];
    }
    selectAllFilter(model, filterProp, filterValue) {
        return this.selectAllValues(model).filter((entity) => entity[filterProp] === filterValue);
    }
    selectOne(model, id) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(this.selectOneValue(model, id));
    }
    selectOneValue(model, id) {
        return this.cache[this.getModelName(model)].find((entity) => entity.id === id);
    }
    setActive(model, entity) {
        if (!entity) {
            this.activeMap[this.getModelName(model)] = null;
        }
        else {
            this.activeMap[this.getModelName(model)] = this.selectOneValue(model, entity.id ? entity.id : entity);
        }
    }
    selectActive(model) {
        return this.activeMap[this.getModelName(model)];
    }
    saveActive(model) {
        return this.save(model, this.selectActive(model));
    }
    deleteActive(model) {
        return this.delete(model, this.selectActive(model)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((entity) => this.setActive(model, null)));
    }
};
DataService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])('dsConfig')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _save__WEBPACK_IMPORTED_MODULE_7__["DataSave"] !== "undefined" && _save__WEBPACK_IMPORTED_MODULE_7__["DataSave"]) === "function" ? _a : Object, typeof (_b = typeof _read__WEBPACK_IMPORTED_MODULE_6__["DataRead"] !== "undefined" && _read__WEBPACK_IMPORTED_MODULE_6__["DataRead"]) === "function" ? _b : Object, typeof (_c = typeof _delete__WEBPACK_IMPORTED_MODULE_5__["DataDelete"] !== "undefined" && _delete__WEBPACK_IMPORTED_MODULE_5__["DataDelete"]) === "function" ? _c : Object, typeof (_d = typeof _data_service_config_interface__WEBPACK_IMPORTED_MODULE_8__["DataServiceConfig"] !== "undefined" && _data_service_config_interface__WEBPACK_IMPORTED_MODULE_8__["DataServiceConfig"]) === "function" ? _d : Object])
], DataService);



/***/ }),

/***/ "./libs/data/src/lib/services/data/interceptors/GenericModelHttpParams.ts":
/*!********************************************************************************!*\
  !*** ./libs/data/src/lib/services/data/interceptors/GenericModelHttpParams.ts ***!
  \********************************************************************************/
/*! exports provided: GenericModelHttpParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenericModelHttpParams", function() { return GenericModelHttpParams; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "@angular/common/http");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_angular_common_http__WEBPACK_IMPORTED_MODULE_0__);

class GenericModelHttpParams extends _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpParams"] {
    constructor(model) {
        super();
        this.model = model;
    }
}


/***/ }),

/***/ "./libs/data/src/lib/services/data/interceptors/header.interceptor.ts":
/*!****************************************************************************!*\
  !*** ./libs/data/src/lib/services/data/interceptors/header.interceptor.ts ***!
  \****************************************************************************/
/*! exports provided: DataServiceHeaderInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataServiceHeaderInterceptor", function() { return DataServiceHeaderInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "@angular/core");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_angular_core__WEBPACK_IMPORTED_MODULE_1__);


let DataServiceHeaderInterceptor = class DataServiceHeaderInterceptor {
    constructor() { }
    intercept(req, next) {
        // Clone the request and set the new header in one step.
        // const dsReq = req.clone({ setHeaders: { 'Content-Type': `application/json` } });
        // send cloned request with header to the next handler.
        return next.handle(req);
    }
};
DataServiceHeaderInterceptor = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], DataServiceHeaderInterceptor);



/***/ }),

/***/ "./libs/data/src/lib/services/data/interceptors/loading.interceptor.ts":
/*!*****************************************************************************!*\
  !*** ./libs/data/src/lib/services/data/interceptors/loading.interceptor.ts ***!
  \*****************************************************************************/
/*! exports provided: LoadingInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingInterceptor", function() { return LoadingInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "@angular/core");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_angular_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data.service */ "./libs/data/src/lib/services/data/data.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _GenericModelHttpParams__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GenericModelHttpParams */ "./libs/data/src/lib/services/data/interceptors/GenericModelHttpParams.ts");
var _a;





let LoadingInterceptor = class LoadingInterceptor {
    constructor(DS) {
        this.DS = DS;
    }
    intercept(req, next) {
        let model;
        if (req.params instanceof _GenericModelHttpParams__WEBPACK_IMPORTED_MODULE_4__["GenericModelHttpParams"])
            model = req.params.model;
        if (model) {
            this.DS.loadingMap[this.DS.getModelName(model)].next(true);
        }
        return next.handle(req)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["finalize"])(() => {
            if (model) {
                this.DS.loadingMap[this.DS.getModelName(model)].next(false);
            }
        }));
    }
};
LoadingInterceptor = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"] !== "undefined" && _data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"]) === "function" ? _a : Object])
], LoadingInterceptor);



/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi ./apps/dakimbo-server/src/main.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! S:\Programming\Projects\Libraries\dakimbo\apps\dakimbo-server\src\main.ts */"./apps/dakimbo-server/src/main.ts");


/***/ }),

/***/ "@angular/common":
/*!**********************************!*\
  !*** external "@angular/common" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/common");

/***/ }),

/***/ "@angular/common/http":
/*!***************************************!*\
  !*** external "@angular/common/http" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/common/http");

/***/ }),

/***/ "@angular/core":
/*!********************************!*\
  !*** external "@angular/core" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/core");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map