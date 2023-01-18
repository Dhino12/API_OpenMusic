import ClientError from "./ClientError.js";

class InvariantsError extends ClientError {
    constructor(message) {
        super(message);
        this.name = 'InvariantError';
    }
}

export default InvariantsError;