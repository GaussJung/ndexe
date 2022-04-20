module.exports = {
    apps: [{
        name: 'ndmulti',
        script: './server3000.js',
        instances: 0,
        exec_mode: 'fork'
    }]
}