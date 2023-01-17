import InvariantsError from "../../exceptions/InvariantsError";
import albumPayloadSchema from "./schema"

const AlbumValidator = {
    validateAlbumPayload: (payload) => {
        const validationResult = albumPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantsError(validationResult.error.message);
        }
    }
}

export default AlbumValidator;
