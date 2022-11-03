export default interface RenderInterface<O> {
    render(callback: (options: O) => void): void;
}