module.exports = {
    apps: [
        {
            instances: 10,
            exec_mode: 'cluster',
            watch: true,
            name: 'hareshi-search',
            script: './node_modules/next/dist/bin/next',
            args: "start --port=2211",
            autorestart: true,
            max_memory_restart: '1G'
        },
    ],
};