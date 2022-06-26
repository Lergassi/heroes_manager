define(
    [],
    function() {
        console.log('TEST', 'module defined: TestRequireJSEntity');
        return function () {
            this.test = () => {
                console.log('TEST', 'this is test() from TestRequireJSEntity');
            }
        };
    }
);