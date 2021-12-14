module.exports = {
    apps: [
        {
            instances: 10,
            exec_mode: 'cluster',
            watch: true,
            name: 'hareshi-search',
            cwd: ' /home/hareshi/hareshi-search',
            script: './node_modules/next/dist/bin/next-start',
            args: "start --port=2211",
            autorestart: true,
            max_memory_restart: '1G'
        },
    ],
};