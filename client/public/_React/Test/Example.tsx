import React, { useState } from 'react';
import useCustomHook from './test.js';

export function Example() {
    // Declare a new state variable, which we'll call "count"
    const {
        value,
        handleClick,
    } = useCustomHook();
    console.log(value);
    console.log(handleClick);

    // const [count, setCount] = useState(0);
    // console.log(42);

    return (
        <div>
            <p>You clicked {value} times</p>
            <button onClick={() => handleClick(value + 1)}>
                Click me
            </button>
            {/*<Element value={value} onClick={handleClick(value + 1)} />*/}
        </div>
    );
}