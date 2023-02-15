let data = 42;

// console.log('test.this 1', this);

export const test = {
    foo: () => {
        return data;
    },
    f1: () => {
        console.log('f1');
    },
    f2: () => {
        console.log('f2');
        console.log('test.this f2', this);
        // console.log('this.f1', this.f1());
        // this.test.f1();
    },
    f3: function () {
        console.log('test.this f3', this);
        this.f1();
        this.f2();
    },
};