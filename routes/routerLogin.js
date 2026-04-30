import { Router } from "express";

const routeAuth=Router();

import { createAuth } from "../controllers/controllerLogin.js";
routeAuth.use("/validar",createAuth)

export default routeAuth;