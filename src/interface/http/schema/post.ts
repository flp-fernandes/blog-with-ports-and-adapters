import joi from 'joi';

export const createPostSchema = joi.object({
  body: joi.object({
    userId: joi.number().required(),
    text: joi.string().required()
  }).required()
});