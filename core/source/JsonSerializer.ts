export const replacer = (key, value) => {
    return typeof value === 'undefined' ? null : value;
    // return typeof value === 'undefined' ? 'undefined' : value;
    // return typeof value === 'undefined' ? undefined : value;
}

export const reviver = (key, value) => {
    // console.log('value', key, value);
    // console.log('value', value === 'undefined');
    if (key === '') {
        return value;
    }

    // return value === 'undefined' ? undefined : value;
    // return value === 'undefined' ? undefined : value;
    // return value === 'null' ? undefined : value;
    // return value === null ? undefined : value;
}

export default class JsonSerializer {
    toJson(value: any): string {
        return JSON.stringify(value, replacer);
        // return JSON.stringify(value);
    }

    parse(text: string) {
        return JSON.parse(text);
        // return JSON.parse(text, reviver);
    }
}