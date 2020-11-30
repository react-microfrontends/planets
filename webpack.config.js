const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const path = require("path");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "react-mf",
    projectName: "planets",
    webpackConfigEnv,
  });

  return webpackMerge.smart(defaultConfig, {
    // customizations go here
    externals: [/^rxjs\/?.*$/],
    devServer: {
      client: {
        port: 9001,
      },
    },
  });
};
