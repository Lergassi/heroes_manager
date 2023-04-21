export default interface CharacterStateInterface<T> {
    setState(code: T): boolean;

    action(callback): boolean;
}