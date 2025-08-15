/**
 * newsroom controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::newsroom.newsroom', ({ strapi }) => ({
    async find(ctx) {
        const filters = ctx.query.filters as Record<string, any>;
        const response = await super.find(ctx);

        if (filters && filters.hasOwnProperty("slug")) {
            const slugValue = filters.slug.$eq || filters.slug;

            const records = await strapi.db.query('api::newsroom.newsroom').findMany({
                where: { slug: slugValue },
                select: ['id', 'view']
            });

            for (const record of records) {
                await strapi.db.query('api::newsroom.newsroom').update({
                    where: { id: record.id },
                    data: {
                        view: record.view == null ? 1 : record.view + 1
                    }
                });
            }
        }

        return response;
    },
}));

