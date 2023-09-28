import { type AnySchema } from 'joi';
import { InvalidProperties } from '../../../util/error';

interface ValidatePropertiesType {
  schema: AnySchema
  params: object
  errorMsg: string
}

export const validateProperties = (
  { schema, params, errorMsg }: ValidatePropertiesType
) => {
  const validation = schema.validate(params, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false
  });

  if (validation.error) {
    throw new InvalidProperties(errorMsg, validation.error.message);
  }
};
