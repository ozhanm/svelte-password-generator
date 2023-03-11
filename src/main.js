import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        thememode: 'LIGHT'
    }
});

export default app;