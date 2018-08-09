const path = require('path');
const webpack = require('webpack');
const HtmlPlugin =require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");

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
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        {
                            loader:"css-loader",
                            options:{importLoaders:1}
                        },'postcss-loader'
                    ]
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
            },{
                test:/\.scss$/,
                // use:[
                //     {
                //         loader:'style-loader'
                //     },
                //     {
                //         loader:'css-loader'
                //     },
                //     {
                //         loader:'sass-loader'
                //     }
                // ]
                use:ExtractTextPlugin.extract({
                    use:[
                        {
                            loader:"css-loader"
                        },
                        {
                            loader:"sass-loader"
                        }],fallback:"style-loader"
                    }
                )
              
       
            },
       
      
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
            new ExtractTextPlugin("css/index.css"),
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
            new PurifyCSSPlugin({
                paths:glob.sync(path.join(__dirname,'src/*.html')),
            }),
            new webpack.BannerPlugin('VingH所有')
         
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