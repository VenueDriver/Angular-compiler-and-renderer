import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { renderModuleFactory } from '@angular/platform-server'
import { enableProdMode } from '@angular/core'
import * as express from 'express';
import { minify } from 'html-minifier';

import * as request from 'request';

try{
  enableProdMode();
}catch(e){
  console.log(e);
}



const app = express();


app.engine('html', (_, options, callback) => {
  const opts = { document: options._template, url: options.route };
  console.log("Engine rendering");
  console.log(Object.keys(options));
  console.log(options.route,options.template);
  console.log("befor eval");
  const lib = eval(options._AppServerModuleNgFactory);
  console.log("after eval");
  renderModuleFactory( lib.AppServerModuleNgFactory , opts)
    .then(html => callback(null, minify(html,{
      removeAttributeQuotes: true,
      minifyCSS : true,
      minifyJS: true,
      collapseWhitespace : true,
      removeComments : true

    })));
});

app.set('view engine', 'html');
app.set('views', 'views');

class NgRenderer{

  render(data){

    return new Promise((resolve,reject)=>{
      if(data.route && data.template && data.serverBundle){
        request(data.template, {encoding: 'utf8'}, function(error, response, body) {
          data._template = body;
          request(data.serverBundle, {encoding: 'utf8'}, function(error, response, body) {
            data._AppServerModuleNgFactory = body;
            // COMPILE MAIN.SERVER THROUGH NEW WEBPACK
            app.render('index',data,(err, html)=>{
              if(err){
                console.log("There's an error",err);
                reject(err);
              }else{
                resolve(html);
              }
            });
          });
        });
      }else{
        reject("Malformed request.")
      }
    })
  }

}

module.exports = NgRenderer;
