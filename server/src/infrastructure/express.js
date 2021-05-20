import express, { Router } from "express";
import cors from "cors";

// const swagger = require('./swagger');
// const passport = require("passport");

// const passportConfig = require("./passport");
// const secureMiddleware = passport.authenticate("jwt", { session: false });

// App
const app = express();

// Configure express for gcp proxy and https
app.set("trust proxy", true);

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Config passport
// passportConfig.jwt(passport);

//Routing
const router = new Router();
app.use(router);
// swagger(app);

export { app, router };
