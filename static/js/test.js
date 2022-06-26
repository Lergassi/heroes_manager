requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        app: '../app',
    },
    urlArgs: "v=" + (new Date()).getTime(),
});

require(
    [
        'app/test/main',
        'app/test/testDeps',
    ],
    function(
        TestMain,
        testDeps,
    ) {
        (new TestMain()).test();
    }
);