requirejs.config({
        baseUrl: '/js/lib',
        paths: {
                app: '../app',
        },
        urlArgs: "v=" + (new Date()).getTime(),
});

require(
    [
        // 'client.bundle',
        'game.bundle',
    ],
    function(
        clientBundle,
        ) {

    }
);