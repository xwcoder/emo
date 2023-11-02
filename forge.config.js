const path = require('node:path')

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(__dirname, './assets/icons/icon'),
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'https://raw.githubusercontent.com/xwcoder/emo/main/assets/icons/icon.ico',
        setupIcon: path.join(__dirname, './assets/icons/icon.ico'),
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-dmg',
      platforms: ['darwin'],
      config: {
        icon: path.join(__dirname, './assets/icons/icon.icns'),
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: path.join(__dirname, './assets/icons/icon.png'),
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          icon: path.join(__dirname, './assets/icons/icon.png'),
        },
      },
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'xwcoder',
          name: 'emo',
        },
        prerelease: true,
        draft: true,
        tagPrefix: '',
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
}
