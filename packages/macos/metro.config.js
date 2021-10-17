/** @todo Remove when upgrading to newer version of react-native-macos & metro-config */
const exclusionList = require('metro-config/src/defaults/blacklist');
// const exclusionList = require('metro-config/src/defaults/exclusionList');
const { getMetroTools } = require('react-native-monorepo-tools');

// Get the metro settings to make it compatible with Yarn workspaces.
const monorepoMetroTools = getMetroTools({
  reactNativeAlias: 'react-native-macos',
});

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  // Add additional Yarn workspace package roots to the module map.
  // This allows importing from any workspace.
  watchFolders: monorepoMetroTools.watchFolders,
  resolver: {
    // Ensure we resolve nohoist libraries from this directory.
    blacklistRE: exclusionList(monorepoMetroTools.blockList),
    extraNodeModules: monorepoMetroTools.extraNodeModules,
  },
};
