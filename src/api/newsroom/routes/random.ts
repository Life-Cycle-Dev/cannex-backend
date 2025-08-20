export default {
    routes: [
        {
            method: "GET",
            path: "/newsrooms",
            handler: "event.find",
            config: {
                auth: false,
            },
        },
        {
            method: "GET",
            path: "/newsrooms/random",
            handler: "newsroom.random",
            config: {
                auth: false,
            },
        },
    ],
};
