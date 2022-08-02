requirejs.config({
        baseUrl: '/js/lib',
        paths: {
                app: '../app',
        },
        urlArgs: "v=" + (new Date()).getTime(),
});

require(
    [
        'bundle',
        // 'app/core',
    ],
    function(
        bundle,
        // core,
        ) {
        // console.log('bundle', bundle);
        // console.log('core', core());
    }
);