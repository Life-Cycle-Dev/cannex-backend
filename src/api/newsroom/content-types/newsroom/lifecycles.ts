
import { errors } from '@strapi/utils';
const { ApplicationError } = errors;

export default {
    async beforeCreate(event) {
        const { data } = event.params;

        if (data.title) {
            data.title = data.title.trim();
        }

        if (!data.slug && data.title) {
            const slug = data.title.toLowerCase().replace(/\s+/g, '-');

            const { results } = await strapi.service('api::newsroom.newsroom').find({ filters: { slug } });

            if (Array.isArray(results) && results.length > 0) {
                data.slug = data.title.toLowerCase().replace(/\s+/g, '-') + '-' + results.length;
            } else {
                data.slug = data.title.toLowerCase().replace(/\s+/g, '-')
            }
        }
    },
};