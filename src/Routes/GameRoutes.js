import { Router } from "express";
import { CreateGame, GetGame } from "../Controllers/game.js";
const router=Router();

router.post("/game",CreateGame);
router.get("/game/:id",GetGame)

const oneRoute=router;

export default oneRoute;