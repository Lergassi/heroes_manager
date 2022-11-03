import React, { useState } from 'react';

const useCustomHook = () => {
    const [value, setValue] = useState('');
    const handleClick = (value) => {
        setValue(value)
        //do something.
    };
    //... some 100-liner initializations/business logic, states, api calls.

        return {
            value,
            handleClick,
            //... // Other exports you need.
        }
}

// function aaa() {
//     return {
//         'a',
//         'b',
//     };
// }

// const a = () => {
//     // const a = 42;
//     let a = 42;
//
//     return {
//         a,
//     };
// }
// console.log(a());

export default useCustomHook;