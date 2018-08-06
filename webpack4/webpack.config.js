const path = require('path');
const webpack = require('webpack');
const HtmlPlugin =require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    mode:'development',
    entry:{
        'index':'./src/index.js',
        'index2':'./src/index.js'
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:'http://127.0.0.1:8081/'
    },

    module:{
        rules:[
            {
                test:/\.css$/,
                // use:['style-loader','css-loader']
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                })
            },{
                test:/\.(png|jpg|gif)/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:500,
                        outputPath:'images/'
                    }
                }]
            },
            {
                test:/\.(html|html)$/i,
                loader:'html-withimg-loader'
            }
        ]
    },

    plugins:[
        new webpack.HotModuleReplacementPlugin(),
            new HtmlPlugin({
                minify:{
                    removeAttributeQuotes:true
                },
                hash:true,
                template:'./src/index.html'
            }),
            new ExtractTextPlugin("css/index.css")
            // ,
            // new HtmlPlugin({
            //     filename:'a.html',
            //     title:'index1-title',
            //     chunks:['index11'],
            //     minify:{
            //         removeAttributeQuotes:true
            //     },
            //     hash:true,
            //     template:'./src/index.html'
            // }),
            // new HtmlPlugin({
            //     filename:'b.html',
            //     title:'index2-title',
            //     chunks:['index22'],
            //     minify:{
            //         removeAttributeQuotes:true
            //     },
            //     hash:true,
            //     template:'./src/index2.html'
            // }),
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'127.0.0.1',
        compress:true,
        open:true,
        hot:true,
        port:8081
    }
};