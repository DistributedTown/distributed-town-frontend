module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  theme: {
    extend: {
      colors: {
        denim: '#146EAA',
        'royal-blue': '#2680EB',
        alizarin: '#E63229',
        carrot: '#F08C28',
        'rain-forest': '#00825B',
        'dove-gray': '#707070',
        christi: '#3CAA14',
        'ripe-lemon': '#F1CF22',
        orange: '#FFA400',
      },
    },
    variants: {
      extend: {
        opacity: ['disabled'],
      },
    },
    plugins: [],
  },
};
