export default {
    routes: [
        {
            method: "GET",
            path: "/events",
            handler: "event.find",
            config: {
                auth: false,
            },
        },
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
