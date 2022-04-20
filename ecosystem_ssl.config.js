module.exports = {
    apps: [{
        name: 'ndmultiSSL',
        script: './sslserver.js',
        instances: 0,
        exec_mode: 'cluster',
        merge_logs: true
    }]
}