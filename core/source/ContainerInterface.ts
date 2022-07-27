export default interface ContainerInterface {
    set<T>(key: string, value: (container: ContainerInterface) => T): void;
    set<T>(key: string, value: T): void;
    set<T>(key: string, value: ((container: ContainerInterface) => T) | T): void;
    // set(key: string, value: any): void;
    // set(key: string, value: (container: ContainerInterface) => any): void;
    // set(key: string, value: any | ((container: ContainerInterface) => any)): void;

    get<T>(key: string): T;
    has(key: string): boolean;
    remove(key: string): void;
}