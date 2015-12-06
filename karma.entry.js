// Require all files in ~/src, excluding index.jsx
var srcContext = require.context('./src', true, /^((?!index).)*\.(js|jsx)/)
srcContext.keys().forEach(srcContext)
