define(
    [
        'test/TestRequireJSLibModule',
        './TestRequireJSAppModule',
        './Entities/TestRequireJSEntity',
    ],
    function(
        TestRequireJSLibModule,
        TestRequireJSAppModule,
        TestRequireJSEntity,
    ) {
        (new TestRequireJSLibModule()).test();
        (new TestRequireJSAppModule()).test();
        (new TestRequireJSEntity()).test();
        return function () {

        };
    }
);