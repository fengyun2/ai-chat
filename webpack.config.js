import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';

export default {
  mode: isDev ? 'development' : 'production',
  entry: './src/lib.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ai-chat.js',
    library: {
      name: 'AiChat',
      type: 'umd',
      export: 'default',
    },
    clean: true,
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: '3.36',
                  targets: {
                    browsers: [
                      'last 7 years', // 支持2015年至今的浏览器
                      'not dead',
                      'ie 11',
                    ],
                  },
                },
              ],
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
              '@babel/preset-typescript',
            ],
            plugins: [],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024 * 1024, // 将所有图片转为 base64
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024 * 1024, // 将所有字体文件转为 base64
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'ai-chat.css',
    }),
    new HtmlWebpackPlugin(
      isDev
        ? {
            template: './index.html',
            filename: 'index.html',
            inject: true,
          }
        : {
            template: './example.html',
            filename: 'example.html',
            inject: false, // 不自动注入资源，我们会在模板中手动引入
          }
    ),
  ],
  optimization: {
    minimize: !isDev,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            drop_console: !isDev,
          },
        },
        extractComments: false,
      }),
    ],
  },
  // 不要将任何依赖外部化，全部打包进来
  externals: [],
};
