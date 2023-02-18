const path = require("path");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = function (config, _env) {
    config.resolve.alias = Object.assign(config.resolve.alias, {
        "@utils": resolve("src/utils"),
        "@common": resolve("src/components/common"),
        "@sections": resolve("src/components/sections"),
        "@constants": resolve("src/constants"),
        "@hooks": resolve("src/hooks"),
        "@pages": resolve("src/pages"),
        "@services": resolve("src/services"),
        "@assets": resolve("src/assets"),
    });

    return config;
};
