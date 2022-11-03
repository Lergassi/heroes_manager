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

    const [count, setCount] = useState(0);
    console.log(42);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}