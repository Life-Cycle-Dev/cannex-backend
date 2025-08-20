/**
 * event service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService("api::event.event", ({ strapi }) => ({
    async findRandom(limit = 1) {
        const knex = strapi.db.connection;
        const rows = await knex("events").orderByRaw("RANDOM()").limit(limit);
        return rows;
    },
}));