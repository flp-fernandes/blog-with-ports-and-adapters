import joi from 'joi';

export const createUserSchema = joi.object({
  body: joi
    .object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
    .required(),
});

export const findUserSchema = joi.object({
  query: joi
    .object({
      id: joi.string().regex(/^\d+$/),
      name: joi.string(),
      email: joi.string().email(),
    })
    .required()
    .min(1),
});
