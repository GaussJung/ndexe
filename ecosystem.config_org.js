module.exports = {
    apps: [{
        name: 'ndmulti',
        script: './server.js',
        instances: 0,
        exec_mode: 'cluster'
    }]
}