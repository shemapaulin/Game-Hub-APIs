import { Router } from "express";
import { CreateGame } from "../Controllers/game.js";
const router=Router();

router.post("/game",CreateGame);

const oneRoute=router;

export default oneRoute;