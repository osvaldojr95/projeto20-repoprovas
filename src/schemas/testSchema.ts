import Joi from "joi";

const testSchema = Joi.object({
    name: Joi.string().required(),
    pdfUrl: Joi.string().required(),
    category: Joi.number().integer().positive().required(),
    discipline: Joi.number().integer().positive().required(),
    teacher: Joi.number().integer().positive().required(),
});

export default testSchema;
