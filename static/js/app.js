requirejs.config({
        baseUrl: '/js/lib',
        paths: {
                app: '../app',
        },
        urlArgs: "v=" + (new Date()).getTime(),
});

require(
    [
        'bundle'
    ],
    function(
        bundle
        ) {

    }
);