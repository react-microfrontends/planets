const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const path = require("path");

module.exports = webpackConfigEnv => {
  const defaultConfig = singleSpaDefaults({
    orgName: "react-mf",
    projectName: "planets",
    webpackConfigEnv
  });

  return webpackMerge.smart(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.krem.css$/,
          exclude: [path.resolve(__dirname, "node_modules")],
          use: [
            {
              loader: "kremling-loader",
              options: {
                namespace: "planets",
                postcss: {
                  plugins: {
                    autoprefixer: {}
                  }
                }
              }
            }
          ]
        }
      ]
    }
  });
};
