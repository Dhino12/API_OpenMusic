import InvariantsError from "../../exceptions/InvariantsError";
import musicPayloadSchema from "./schema"

const MusicValidator = {
    validateMusicPayload: (payload) => {
        const validationResult = musicPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantsError(validationResult.error.message);

        }
    }
}

export default MusicValidator;