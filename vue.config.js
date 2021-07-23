module.exports = {
    runtimeCompiler: true,
    productionSourceMap: false,
    outputDir: "../value-estimator-backend/public",
    // devServer: {
    //     host: 'value-Estimator.local'
    // },
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/'
}