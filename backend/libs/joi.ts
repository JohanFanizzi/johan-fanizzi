import Joi, { ObjectSchema } from '@hapi/joi';

// Esquemas de validación
export const networkSchema = Joi.object({
  name: Joi
    .string()
    .required(),
  url: Joi
    .string()
    .required(),
  icon: Joi
    .string()
    .required(),
  order: Joi
    .number(),
  isPublic: Joi
    .boolean()
});

export const abilitySchema = Joi.object({
  name: Joi
    .string()
    .required(),
  icon: Joi
    .string()
    .required(),
  order: Joi
    .number(),
  isPublic: Joi
    .boolean()
});

export const educationSchema = Joi.object({
  institution: Joi
    .string()
    .required(),
  degree: Joi
    .string()
    .required(),
  description: Joi
    .string(),
  dateStart: Joi
    .date(),
  dateEnd: Joi
    .date(),
  abilities: Joi
    .array()
    .items(Joi.string()),
  isPublic: Joi
    .boolean()
});

export const experienceSchema = Joi.object({
  company: Joi
    .string()
    .required(),
  position: Joi
    .string()
    .required(),
  description: Joi
    .string(),
  dateStart: Joi
    .date(),
  dateEnd: Joi
    .date(),
  abilities: Joi
    .array()
    .items(Joi.string()),
  isPublic: Joi
    .boolean()
});

export const projectSchema = Joi.object({
  name: Joi
    .string()
    .required(),
  description: Joi
    .string()
    .required(),
  url: Joi
    .string()
    .required(),
  abilities: Joi
    .array()
    .items(Joi.string()),
  order: Joi
    .number(),
  isPublic: Joi
    .boolean()
});

// Valida la estructura de la data recibida con uno de los schemas indicados
export const validate = (
  data: any,
  schema: ObjectSchema
) => {
  return schema.validate(data);
}
