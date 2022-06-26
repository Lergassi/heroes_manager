define(
    [],
    function() {
        console.log('TEST', 'module defined: TestRequireJSAppModule');
        return function () {
            this.test = () => {
                console.log('TEST', 'this is test() from TestRequireJSAppModule');
            }
        };
    }
);