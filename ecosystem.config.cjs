module.exports = {
    apps: [
        {
            name: 'http-server',
            script: 'node ./dist/app.js',
        },
    ],
    deploy: {
        production: {
            user: '',
            host: '',
            ref: '',
            repo: '',
            path: '',
            'pre-deploy-local': '',
            'post-deploy': '',
            'pre-setup': '',
        },
    },
};
