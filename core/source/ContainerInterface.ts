export default interface ContainerInterface {
    // set<T>(key: string, value: (container: ContainerInterface) => T): void;
    // set<T>(key: string, value: T): void;
    // set<T>(key: string, value: ((container: ContainerInterface) => T) | T): void;
    set<T>(key: string, value: T | ((container: ContainerInterface) => T)): T;

    get<T>(key: string): T;

    has(key: string): boolean;

    remove(key: string): void;
}