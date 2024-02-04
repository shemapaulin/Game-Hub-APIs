import gameStrc from "../Models/GameSchema.js";
import gameJoiSchema from "../Utils/gameSchema.js";
import reportJoiError from "../Utils/reportJoiError.js";

const CreateGame = async (req, res) => {
  try {
    const inputValidation = gameJoiSchema.validate(req.body);
    if (inputValidation.error) return reportJoiError(inputValidation, res);

    const game = await gameStrc.create(req.body);
    if (game) {
      res.status(200).json({
        result: game,
        message: "Game Created Successfully",
      });
    } else {
      res.status(404).json({
        message: "Creating new Game failed",
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res
        .status(400)
        .json({ message: "Validation failed", errors: validationErrors });
    }

    console.log("Internal server error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await gameStrc.findById(gameId);

    if (game) {
      res.status(200).json({ result: game });
    } else {
      res.status(404).json({ message: "game not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const GetGames=async(req,res)=>{
  try {
      const game=await gameStrc.find() ;
      res.status(200).json({
          result: game
      })
  } catch (error) {
      res.status(500).send("internal server error");
      console.log("internal server error",error);
  }
}
const updateGame= async (req, res) => {
  try {
    const GameId = req.params.id;
    const inputValidation = gameJoiSchema.validate(req.body);
    if (inputValidation.error) return reportJoiError(inputValidation, res);
    const newGame = await gameStrc.update(req.body, {
      where: { id: GameId },
    });

    if (newGame) {
      res.status(200).json({
        message: "you have succesfully updated game",
        result: req.body,
      });
    } else {
      res.status(404).send("source not found or no changes made");
    }
  } catch (error) {
    console.log("internal server error", error);
  }
};
const DeleteGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await gameStrc.findOneAndDelete(gameId);

    if (game) {
      res.status(200).json({ message: "Game deleted successfully" });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { CreateGame, GetGame, DeleteGame,GetGames,updateGame };
