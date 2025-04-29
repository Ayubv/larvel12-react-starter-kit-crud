import '../css/app.css';
import NProgress from 'nprogress'; // remove progress bar
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
// Immediately stop and remove the progress bar
NProgress.remove()
NProgress.done()

// Optional: override NProgress styles globally
const nprogressStyle = document.createElement('style')
nprogressStyle.innerHTML = `
  #nprogress { display: none !important; }
  #nprogress .bar, #nprogress .peg, #nprogress .spinner { display: none !important; }
`
document.head.appendChild(nprogressStyle)
// Immediately stop and remove the progress bar end code




const appName = import.meta.env.VITE_APP_NAME || 'Laravel';






createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },



});

// This will set light / dark mode on load...
initializeTheme();
