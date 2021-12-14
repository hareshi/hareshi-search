module.exports = {
    apps: [
        {
            instances: 10,
            exec_mode: 'cluster',
            watch: true,
            name: 'hareshi-search',
            cwd: ' /home/hareshi/hareshi-search',
            script: 'yarn',
            args: 'start',
            max_memory_restart: '1G'
        },
    ],
};