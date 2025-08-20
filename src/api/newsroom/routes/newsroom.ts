/**
 * newsroom router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController("api::newsroom.newsroom", ({ strapi }) => ({
    async random(ctx) {
        const limit = ctx.query.limit ? Number(ctx.query.limit) : 1;

        const knex = strapi.db.connection;
        const rows = await knex("newsrooms")
            .orderByRaw("RANDOM()")
            .limit(limit);

        ctx.body = { data: rows };
    },
}));
