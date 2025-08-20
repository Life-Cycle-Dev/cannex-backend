/**
 * newsroom service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::newsroom.newsroom', ({ strapi }) => ({
    async findRandom(limit = 1) {
        const knex = strapi.db.connection;
        const rows = await knex("newsrooms").orderByRaw("RANDOM()").limit(limit);
        return rows;
    },
}));
