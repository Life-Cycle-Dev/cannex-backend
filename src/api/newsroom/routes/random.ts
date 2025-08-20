export default {
    routes: [
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
