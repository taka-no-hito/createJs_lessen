module.exports = {
  sass: {
    src: [  // もし外部のcssフレームワーク使うなら配列の先頭で読み込むと良い
      "./src/scss/**/*.scss",'!' + "./src/scss/**/_*.scss"
    ],
    dest: './dev/css/',
    product: './product/css/',
    output: 'style.css',  // 出力ファイル名
    autoprefixer: {
      browsers: ['last 2 versions']  //対象ブラウザ指定
    },
    watch: './src/scss/**/*'
  },
  ejs: {
    src: [
      "./src/ejs/**/*.ejs",'!' + "./src/ejs/**/_*.ejs"
    ],
    dest: './dev/',
    product: './product/',
    watch: './src/ejs/**/*'
  },
  js: {
    src: [
      "./src/js/**/*.js",'!' + "./src/js/**/_*.js"
    ],
    dest: './dev/js/',
    product: './product/js/',
    watch: './src/js/**/*'
  },
  img: {
    src: [
      "./src/img/**/*.?(png|jpg|gif|svg)",'!' + "./src/img/**/_*.?(png|jpg|gif|svg)"
    ],
    dest: './dev/img/',
    product: './product/img/',
    watch: './src/img/**/*.?(png|jpg|gif|svg)'
  }
};
