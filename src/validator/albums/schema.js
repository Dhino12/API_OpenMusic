import Joi from "joi";

const albumPayloadSchema = Joi.object({
    name: Joi.string().required(),
    year: Joi.number().required(),
})

export default albumPayloadSchema;