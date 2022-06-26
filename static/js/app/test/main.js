define(
    [

    ],
    function(

    ) {
        console.log('TEST', 'module defined: main');
        return function () {
            this.test = () => {
                console.log('TEST', 'this is test() from main module');
            }
        };
    }
);