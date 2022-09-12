requirejs.config({
        baseUrl: '/js/lib',
        paths: {
                app: '../app',
        },
        urlArgs: "v=" + (new Date()).getTime(),
});

require(
    [
        // 'bundle',
        'client.bundle',
        // 'sandbox.bundle',
    ],
    function(
        // bundle,
        clientBundle,
        // sandboxBundle,
        ) {
        // console.log(sandboxBundle);
    }
);