module.exports = {
    apps: [{
        name: 'ndmulti3000',
        script: './server3000.js',
        instances: 0,
        exec_mode: 'cluster',
        merge_logs: true
    }]
}