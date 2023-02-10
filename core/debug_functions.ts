export function debug_header(title?: string) {
    let lines = '='.repeat(16);
    // let msg = (typeof title === 'undefined' || title === null) ? lines + lines :  lines + ' ' + title + ' ' + lines;
    let msg = (typeof title === 'undefined' || title === null) ? lines :  lines + ' ' + title;
    // let msg = (typeof title === 'undefined' || title === null) ? lines :  title + ' ' + lines;
    console.log(msg);
}