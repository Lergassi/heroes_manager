export function testNull() {
    let n = null;
    console.log('n', n);
    console.log('n === null', n === null);
    console.log('n === undefined', n === undefined);
    console.log('typeof', typeof n);
    // console.log(n instanceof null);
}

export function testJson() {
    const replacer = (key, value) => {
        // return typeof value === 'undefined' ? null : value;
        return typeof value === 'undefined' ? 'undefined' : value;
        // return typeof value === 'undefined' ? undefined : value;
    }
    const reviver = (key, value) => {
        // console.log('value', key, value);
        // console.log('value', value === 'undefined');
        if (key === '') { return value; }

        return value === 'undefined' ? undefined : value;
        // return value === 'undefined' ? 'undefined' : value;
        // return value === 'undefined' ? 42 : value;
        // return value === null ? undefined : value;
    }

    let hero = {
        name: 'warrior',
        level: 10,
        role: undefined,
    };

    // let json = JSON.stringify(hero);
    // let json = JSON.stringify(hero, replacer);
    // console.log(json);

    // let newJson = '{"name":"warrior","level":10,"role":null}';
    let newJson = '{"name":"warrior","level":10,"role":"undefined"}';
    // let newHero = JSON.parse(newJson);
    let newHero = JSON.parse(newJson, reviver);
    console.log(newHero);
}