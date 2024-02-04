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
const DeleteGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await gameStrc.findOne({ where: { _id: gameId } });

    if (game) {
      // Assuming gameStrc.destroy is the method to delete a record
      await gameStrc.destroy({ where: { id: gameId } });
      res.status(200).json({ message: "Game deleted successfully" });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { CreateGame, GetGame, DeleteGame };
