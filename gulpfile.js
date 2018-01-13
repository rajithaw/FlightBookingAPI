const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const tslint = require('gulp-tslint');
const mocha = require('gulp-mocha');
const webpack_stream = require('webpack-stream');

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/prod/**/*');
});

gulp.task('clean:dev', function () {
  return del('dist/dev/**/*');
});

gulp.task('build:prod', function() {
    return webpack_stream({
        entry: './src/index',
        target: 'node',
        resolve: {
            extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
        },
        output: {
            filename: 'flightBookingApi.js'
        },
        module: {
            loaders: [
                { test: /\.json$/, loader: 'json-loader' },
                { test: /\.ts$/, loader: 'ts-loader' }
            ]
        },
        node: {
            console: true,
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
          }
    })
        .pipe(gulp.dest('./dist/prod'));
});

gulp.task('build', () => {
    const tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/dev'));
});

gulp.task('watch', ['ts'], () => {
    return gulp.watch([
            'src/**/*.ts',
            'test/**/*.test.ts'
        ], ['ts']);
});

gulp.task('default', ['watch']);

gulp.task('lint', () => {
    return gulp.src([
            'src/**/*.ts',
            'test/**/*.test.ts'
        ])
        .pipe(tslint({
            formatter: "prose"
        }))
        .pipe(tslint.report());
});

gulp.task('test', () => {
    return gulp.src('test/**/*.test.ts')
        .pipe(mocha({
            reporter: 'progress',
            require: ['ts-node/register'],
            timeout: 0
        }));
});