//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '../',

    files: [
        'app/lib/angular/angular.js',
        'app/lib/angular-route/angular-route.js',
        'app/lib/angular-route/angular-resource.js',
        'app/lib/angular-mocks/angular-mocks.js',
        
        'app/*.module.js',
        
        'app/components/**/*.module.js',
        'app/components/**/*.js',
        
        'test/unit/**/*.js'
    ],
    
    colors: true,

    autoWatch: true,
    
    singleRun: false,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-coverage'
    ],

    reporters: ['progress', 'coverage'],
    preprocessors: {
        'app/components/**/*.js': ['coverage']
    },

    coverageReporter: {
        reporters: [
            {
                type: 'html',
                dir: 'reports/coverage'
            },
            {
                type: 'text'
            }
        ]
    },

    junitReporter: {
      outputFile: 'reports/unit.xml',
      suite: 'unit'
    }

  });
};
