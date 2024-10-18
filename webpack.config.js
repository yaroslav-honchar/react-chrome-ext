const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: {
    index: "./src/index.tsx",
    background: "./src/background/background.ts",
  },
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/assets/manifest.json", to: "../" },
        {
          from: "src/assets/**/*.*", to: (pathData) => {
            return pathData.absoluteFilename.replace(/src\/assets\//, "dist/")
          },
        },
      ],
    }),
    ...getHtmlPlugins(["index"]),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
  },
}

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HTMLPlugin({
        title: "Saver",
        filename: `${chunk}.html`,
        chunks: [chunk],
      }),
  )
}
