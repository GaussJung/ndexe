module.exports = {
    apps: [{
        name: 'ndmulti',
        script: './server80.js',
        instances: 0,
        exec_mode: 'cluster',
        merge_logs: true
    }]
}