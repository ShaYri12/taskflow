import { createInertiaApp } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'TaskFlow';

const pages = import.meta.glob('./pages/**/*.tsx');

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        const page = pages[`./pages/${name}.tsx`];
        return page().then(
            (module) => (module as { default: unknown }).default as never,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
