module.exports = {
    apps: [{
        name: 'ndmulti8010',
        script: './server8010.js',
        instances: 0,
        exec_mode: 'cluster',
        merge_logs: true
    }]
}