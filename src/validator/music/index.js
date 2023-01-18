import InvariantsError from "../../exceptions/InvariantsError.js";
import musicPayloadSchema from "./schema.js"

const MusicValidator = {
    validateMusicPayload: (payload) => {
        const validationResult = musicPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantsError(validationResult.error.message);

        }
    }
}

export default MusicValidator;