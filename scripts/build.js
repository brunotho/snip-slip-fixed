// scripts/build.js
const esbuild = require('esbuild')
const sassPlugin = require('esbuild-sass-plugin').sassPlugin

const args = process.argv.slice(2)
const watchMode = args.includes('--watch')

const options = {
  entryPoints: ['app/javascript/application.js'],
  bundle: true,
  outdir: 'app/assets/builds',
  publicPath: '/assets',
  plugins: [sassPlugin()],
  loader: {
    '.js': 'jsx',
    '.scss': 'css'
  },
  logLevel: 'info',
  metafile: true,   
  sourcemap: true,
  target: ['es2015']
}

if (watchMode) {
  // Simpler watch mode
  esbuild.context(options).then(context => {
    context.watch()
    console.log('Watching for changes...')
  }).catch(() => process.exit(1))
} else {
  esbuild.build(options).catch(() => process.exit(1))
}
