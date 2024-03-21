/** @type {import('@remix-run/dev').AppConfig} */

import config from './config.js';

export default {
  ignoredRouteFiles: ["**/.*"],
  tailwind: true,
  postcss: true,
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  // watchPaths: ["./public"],
  // server: "./server.ts",
};
