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
}));
