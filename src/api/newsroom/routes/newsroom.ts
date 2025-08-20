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

        { method: "GET", path: "/newsrooms", handler: "newsroom.find" },
        { method: "GET", path: "/newsrooms/:id", handler: "newsroom.findOne" },
        { method: "POST", path: "/newsrooms", handler: "newsroom.create" },
        { method: "PUT", path: "/newsrooms/:id", handler: "newsroom.update" },
        { method: "DELETE", path: "/newsrooms/:id", handler: "newsroom.delete" },
    ],
};
