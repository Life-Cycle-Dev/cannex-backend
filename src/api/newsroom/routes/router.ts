export default {
    routes: [
        {
            method: "GET",
            path: "/newsrooms",
            handler: "newsroom.find",
            config: {
                auth: false,
            },
        },
        {
            method: "GET",
            path: "/newsrooms/:id",
            handler: "newsroom.findOne",
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
