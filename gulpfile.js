var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sassGlob = require("gulp-sass-glob");
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify-css');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
var ejs = require('gulp-ejs');
var htmlbeautify = require('gulp-html-beautify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var mozjpeg  = require('imagemin-mozjpeg');
var webpackStream = require("webpack-stream");
var webpack = require("webpack");
var config = require('./config');
var configSass = config.sass;
var configEjs = config.ejs;
var configJs = config.js;
var configImg = config.img;

// live reload
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './dev/'
    },
    files: ['./**/*.html','./img/**/*']
  });
});
gulp.task('sass', function () {
  return gulp.src(configSass.src)
    .pipe(plumber({                                // エラー出たら通知
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(sassGlob())                              // Sassの@importにおけるglobを有効にする
    .pipe(sourcemaps.init())                       // sourcemapを作成
    .pipe(sass({outputStyle : 'expanded'}))        // 整形
    .pipe(autoprefixer(configSass.autoprefixer))   // vendor-prefixつける
    .pipe(sourcemaps.write('./'))                  // sourcemap出力
    .pipe(gulp.dest(configSass.dest))              // 出力
    .pipe(browserSync.reload({                     // ブラウザリロード
      stream: true
    }));
});

gulp.task('ejs', function() {
    return gulp.src(configEjs.src)
    .pipe(plumber({                                // エラー出たら通知
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(ejs({}, {}, {ext: '.html'}))            // 拡張子指定
    .pipe(htmlbeautify({                          // インデント整理
      "indent_size": 2,
      "max_preserve_newlines": 1,
      "keep_array_indentation": true,
    }))
    .pipe(gulp.dest(configEjs.dest))              // 出力
});

gulp.task("js", function() {
    return gulp.src(configJs.src)
    .pipe(plumber({                                // エラー出たら通知
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(webpackStream({                         //webpackの設定
      entry: "./src/js/main.js",
      output: {
        filename: "bundle.js"
      },
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }],
        }],
      },
      devtool: 'source-map',
      plugins: [
        new webpack.ProvidePlugin({
          jQuery: 'jquery',
          $: 'jquery'
        }),
      ],
    }, webpack))
    .pipe(gulp.dest(configJs.dest))               // 出力
    .pipe(browserSync.reload({                    // ブラウザリロード
      stream: true
    }));
});

gulp.task("img", function() {
    return gulp.src(configImg.src)
    .pipe(gulp.dest(configImg.dest))              // 出力
});


gulp.task('watch', function () {
  watch(configSass.watch, function(){
      gulp.start("sass");
  });
  watch(configEjs.watch, function(){
      gulp.start("ejs");
  });
  watch(configJs.watch, function(){
      gulp.start("js");
  });
  watch(configImg.watch, function(){
      gulp.start("img");
  });
});

gulp.task('default', ['sass','ejs','js','img','browser-sync','watch']);

// 納品用タスク
gulp.task("product", function() {
  // css
  gulp.src(configSass.src)
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer(configSass.autoprefixer))
    .pipe(minify())
    .pipe(gulp.dest(configSass.product));
  // html
  gulp.src(configEjs.src)
    .pipe(ejs({}, {}, {ext: '.html'}))
    .pipe(htmlbeautify({
      "indent_size": 2,
      "max_preserve_newlines": 1
    }))
    .pipe(gulp.dest(configEjs.product));
  // js
  gulp.src(configJs.src)
    .pipe(webpackStream({
      entry: "./src/js/main.js",
      output: {
        filename: "bundle.js"
      },
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }],
        }],
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            drop_console: true
          },
        }),
        new webpack.ProvidePlugin({
          jQuery: 'jquery',
          $: 'jquery'
        }),
      ],
    }, webpack))
    .pipe(gulp.dest(configJs.product));
  // img
  gulp.src(configImg.src)
    .pipe(imagemin([                              // 画像の圧縮
      pngquant({ quality: '50-70', speed: 1 }),   // pngの圧縮率設定
      mozjpeg({ quality: 80 }),                   // jpgの圧縮率設定
      imagemin.svgo(),                            // svgの圧縮
      imagemin.gifsicle()                         // gifの圧縮
    ]))
    .pipe(imagemin())
    .pipe(gulp.dest(configImg.product));
});
