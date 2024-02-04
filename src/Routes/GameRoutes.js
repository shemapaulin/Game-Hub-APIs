import { Router } from "express";
import { CreateGame, DeleteGame, GetGame, GetGames, updateGame } from "../Controllers/game.js";
const router=Router();

router.post("/game",CreateGame);
router.get("/getGame/:id",GetGame)
router.get("/getGames",GetGames)
router.put("/updateGame/:id",updateGame)
router.delete("/deleteGame/:id",DeleteGame)

const oneRoute=router;

export default oneRoute;