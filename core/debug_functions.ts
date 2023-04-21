export function debug_header(title?: string) {
    // let headerSidesLength = 16;
    let headerSidesLength = 32;
    let lines = '='.repeat(headerSidesLength);
    let msg = (typeof title === 'undefined' || title === null) ? lines + lines : lines + ' ' + title + ' ' + lines;
    // let msg = (typeof title === 'undefined' || title === null) ? lines :  lines + ' ' + title;
    // let msg = (typeof title === 'undefined' || title === null) ? lines :  title + ' ' + lines;
    console.log(msg);
}

export function separate(char: string = '-', length: number = 32) {
    console.log(char.repeat(length));
}