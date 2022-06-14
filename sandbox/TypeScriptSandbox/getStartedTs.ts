let str = 'Hello, World!';
console.log(str);

// const user = {
//     name: "Hayes",
//     id: 0,
// };

interface User {
    id: number;
    name: string;
    email: string;
}

const user: User = {
    id: 0,
    name: "user01",
    email: 'user01@email.com',
};

console.log(user);