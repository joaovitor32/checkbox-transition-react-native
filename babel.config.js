module.exports = {
  presets: [
    "module:metro-react-native-babel-preset",
    ["@babel/preset-env", { loose:true,targets: { node: "current" } }],
    '@babel/preset-typescript',
  ],
};