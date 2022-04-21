module.exports = {
    apps: [{
        name: 'ndmulti8000',
        script: './server8000.js',
        instances: 0,
        exec_mode: 'cluster',
        merge_logs: true
    }]
}