define(
    [],
    function() {
        console.log('TEST', 'module defined: TestRequireJSLibModule');
        return function () {
            this.test = () => {
                console.log('TEST', 'this is test() from TestRequireJSLibModule');
            }
        };
    }
);