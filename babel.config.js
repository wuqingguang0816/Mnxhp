module.exports = {
  presets: [
    '@vue/app'
  ],
  'env': {
    'development': {
      'plugins': [
        'dynamic-import-node',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator'
      ]
    }
  }
}
