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

      await strapi.db.connection('newsrooms')
        .where({ slug: slugValue })
        .update({
          view: strapi.db.connection.raw('COALESCE(view, 0) + 1')
        });
    }

    return response;
  },
  async random(ctx) {
    const limit = Number(ctx.query.limit) || 1;

    const count = await strapi.db.query("api::newsroom.newsroom").count({
      where: {
        publishedAt: { $notNull: true }
      }
    });

    if (count === 0) {
      ctx.body = { data: [], meta: {} };
      return;
    }

    let entries;

    if (count <= limit) {
      entries = await strapi.entityService.findMany("api::newsroom.newsroom", {
        populate: {
          image: { fields: ["url", "alternativeText"] },
          seo: { populate: { metaImage: true } },
        },
        publicationState: 'live',
        fields: ["title", "description", "slug", "publishedAt", "updatedAt"],
        sort: ["publishedAt:desc"],
      });
    } else {
      const randomOffset = Math.floor(Math.random() * (count - limit + 1));

      entries = await strapi.entityService.findMany("api::newsroom.newsroom", {
        populate: {
          image: { fields: ["url", "alternativeText"] },
          seo: { populate: { metaImage: true } },
        },
        publicationState: 'live',
        fields: ["title", "description", "slug", "publishedAt", "updatedAt"],
        start: randomOffset,
        limit,
      });
    }

    ctx.body = { data: entries, meta: { total: count } };
  }

}));

