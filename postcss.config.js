import postcssPresetEnv from 'postcss-preset-env';

export default {
  plugins: [
    postcssPresetEnv({
      browsers: [
        'last 7 years', // 支持2015年至今的浏览器
        'not dead',
        'ie 11',
      ],
      autoprefixer: { grid: true },
    }),
  ],
};
