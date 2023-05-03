import esbuild from 'esbuild';
import fs from 'fs';

const dist = 'dist';
export function clean() {
    fs.rmSync(dist, { recursive: true, force: true })
}

export function build(isProd) {
    const buildOptions = {
        entryPoints: ['src/index.ts'],
        bundle: true,
        sourcemap: true,
        outdir: dist,
        minify: !!isProd
    }
    const buildResult = esbuild.build(buildOptions)
    buildResult.catch(() => process.exit(1))
}

export function nodeVersion() {
    let v = process.versions.node.split('.')
    if (v.length < 3) {
        v.unshift('0')
    }
    v = v.map(p => parseInt(p, 10))
    return {
        major: v[0],
        minor: v[1],
        patch: v[2]
    }
}

export function checkNodeVersion(majorMinimum) {
    const version = nodeVersion()
    if (version.major < majorMinimum) {
        Print.error(`Invalid node version. You have ${version.major}. Require ${majorMinimum}.`)
        return false
    }
    return true
}