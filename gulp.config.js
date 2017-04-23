module.exports = function() {
    var client ='./src/client/';
    var clientApp = client + 'app/';
    var temp = './.tmp/';
    var server = './src/server/';
    var root = './';
    var report = './report/';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];
    var specRunnerFile = 'specs.html';

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
        html: clientApp + '**/*.html',
        fonts: './bower_components/font-awesome/fonts/**/*.*',
        images: client + 'images/**/*.*',
        htmltemplates: clientApp + '**/*.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        less: client + 'styles/styles.less',
        server: server,
        temp: temp,
        root: root,
        report: report,
        browserReloadDelay: 1000,

        /**
         * optimized files
         */
        optimized: {
            lib: 'lib.js',
            app: 'app.js'
        },

        /**
         * template cahce
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/'
            }
        },

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
        packages: [
            './package.json',
            './bower.json'
        ],

        /**
         * spec.html, our HTML spec runner
         */
        specRunner: client + specRunnerFile,
        specRunnerFile: specRunnerFile,
        testlibraries: [
            'node_modules/mocha/mocha.js',
            'node_modules/chai/chai.js',
            'node_modules/mocha-clean/index.js',
            'node_modules/sinon-chai/lib/sinon-chai.js'
        ],
        specs: [
            clientApp + '**/*.spec.js'
        ],

        /**
         * Karma and testing settings
         */
        serverIntegrationSpecs: [client + 'tests/server-integration/**/*.spec.js'],
        specHelpers: [client + 'test-helpers/*.js'],

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
        };
        return options;
    };

    config.karma = getKarmaOptions();

    return config;

    ////////////////
    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                client + '**/*.module.js',
                client + '**/*.js',
                temp + config.templateCache.file,
                config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'text-summary'}
                ]
            },
            preprocessors: {}
        };

        options.preprocessors[clientApp + '**/!(*.spec)*(.js)'] = ['coverage'];
        return options;
    }
};
