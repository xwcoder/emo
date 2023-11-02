module.exports = (api) => {
  api.cache(true)

  const plugins = []
  const presets = [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ]

  const targets = {
    chrome: '116',
  }

  if (process.env.NODE_ENV === 'development') {
    plugins.push('react-refresh/babel')
  }

  return {
    targets,
    presets,
    plugins,
  }
}
