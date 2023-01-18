import ClientError from "./ClientError.js";

class NotfoundError extends ClientError {
    constructor(message) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

export default NotfoundError;