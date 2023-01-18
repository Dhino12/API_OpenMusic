import InvariantsError from "../../exceptions/InvariantsError.js";
import albumPayloadSchema from "./schema.js"

const AlbumValidator = {
    validateAlbumPayload: (payload) => {
        const validationResult = albumPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantsError(validationResult.error.message);
        }
    }
}

export default AlbumValidator;
