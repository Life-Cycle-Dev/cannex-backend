export default {
    routes: [
        {
            method: "GET",
            path: "/events/random",
            handler: "event.random",
            config: {
                auth: false,
            },
        },
    ],
};
