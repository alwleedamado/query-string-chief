import * as buildUtils from './build.utils.mjs'

if (!buildUtils.checkNodeVersion(15)) {
  console.error('Build failed.')
  process.exit(1)
}

const isProd = process.argv[2] === 'prod'

buildUtils.clean()
buildUtils.build(isProd)