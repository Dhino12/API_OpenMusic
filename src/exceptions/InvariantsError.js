import ClientError from "./ClientError";

class InvariantsError extends ClientError {
    constructor(message) {
        super(message);
        this.name = 'InvariantError';
    }
}

export default InvariantsError;