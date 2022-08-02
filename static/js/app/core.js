define(
    [
        // 'app/message',
    ],
    function(
        message,
    ) {
        // console.log('Amd module "core" defined.');
        // console.log('message', message.getHello());

        return () => {
            return 'this is core';
        };
    }
);