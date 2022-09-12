export default class ValidationError extends Error {
    static notEmpty() {
        return new ValidationError('Значение не может быть пустым.');
    }
}