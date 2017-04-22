module.exports = function() {
    var client ='./src/client/';
    var clientApp = client + 'app/';
    var temp = './.tmp/';
    var server = './src/server/'

    var config ={
        /**
         * Files paths
         */
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        build: './build/',
        client: client,
        index: client + 'index.html',
        css: temp + 'styles.css',
        fonts: './bower_components/font-awesome/fonts/**/*.*',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        less: client + 'styles/styles.less',
        server: server,
        temp: temp,
        browserReloadDelay: 1000,

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },

        /**
         * Node settings
         */
        defaultPort: 7203,
        nodeServer: './src/server/app.js'
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            director: config.bower.directory,
            ignorePath: config.bower.ignorePath
        }
        return options;
    };

    return config;
};
