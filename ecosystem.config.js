module.exports = {
    apps: [{
        name: 'ndmulti',
        script: './server-startup.js',
        instances: 0,
        exec_mode: 'cluster'
    }]
}