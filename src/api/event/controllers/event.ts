/**
 * event controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::event.event', ({ strapi }) => ({
    async find(ctx) {
        const filters = ctx.query.filters as Record<string, any>;
        const response = await super.find(ctx);

        if (filters && filters.hasOwnProperty("slug")) {
            const slugValue = filters.slug.$eq || filters.slug;

            await strapi.db.connection('events')
                .where({ slug: slugValue })
                .update({
                    view: strapi.db.connection.raw('COALESCE(view, 0) + 1')
                });
        }

        return response;
    },
    async random(ctx) {
        const limit = Number(ctx.query.limit) || 1;
        const count = await strapi.db.query("api::event.event").count();
        if (count === 0) {
            return ctx.body = { data: [], meta: {} };
        }

        const randomOffset = Math.floor(Math.random() * count);
        const entries = await strapi.entityService.findMany("api::event.event", {
            populate: {
                image: { fields: ["url", "alternativeText"] },
                seo: { populate: { metaImage: true } },
            },
            fields: ["title", "description", "publishedAt", "slug"],
            limit,
            start: randomOffset,
        });

        ctx.body = { data: entries, meta: { total: count } };
    },
}));
