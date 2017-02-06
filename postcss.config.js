module.exports = {
  plugins: [
    require('cssnano')({
      reduceIdents: false,
      discardDuplicates: true,
      autoprefixer: {add: true,browsers: ['> 1%', 'last 2 versions']},
      zindex: false
    })
  ]
};
