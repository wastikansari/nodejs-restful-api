class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }

    static alreadyExist(message) {
        return new CustomErrorHandler(201, message);
    }

    static wrongCredentials(message = 'Username or password is wrong!') {
        return new CustomErrorHandler(201, message);
    }

    static unAuthorized(message = 'unAuthorized') {
        return new CustomErrorHandler(201, message);
    }

    static notFound(message = '404 Not Found') {
        return new CustomErrorHandler(201, message);
    }

    static serverError(message = 'Internal server error') {
        return new CustomErrorHandler(201, message);
    }
}

export default CustomErrorHandler;
