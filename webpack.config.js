const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "react-mf",
    projectName: "planets",
    webpackConfigEnv,
  });

  const externals = [/^rxjs\/?.*$/];

  return merge(defaultConfig, {
    // customizations go here
    externals,
  });
};
