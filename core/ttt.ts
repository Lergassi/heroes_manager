export interface AttachUIInterface {
    attach(target);

    detach();
}

// export interface AttachObjectInterface<T extends AttachUIInterface<T>> {
export interface AttachObjectInterface {
    attach(target);

    detach();
}

// export interface TTT2 extends AttachObjectInterface<T> {
//
// }