import { defineConfig, mergeConfig } from 'vite';

export default (config: any) => {
    return mergeConfig(config, defineConfig({
        resolve: {
            alias: {
                '@': '/src',
            },
        },
        server: {
            allowedHosts: true
        }
    }));
};