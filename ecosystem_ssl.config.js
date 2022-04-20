module.exports = {
    apps: [{
        name: 'ndmultiSSL',
        script: 'sudo ./sslserver.js',
        instances: 0,
        exec_mode: 'cluster',
        merge_logs: true
    }]
}