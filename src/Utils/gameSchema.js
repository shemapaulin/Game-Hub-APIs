import Joi from 'joi';

const gameJoiSchema = Joi.object({
  gameName: Joi.string().required(),
  platform: Joi.string().required(),
  ratings: Joi.number().required()
});

export default gameJoiSchema;