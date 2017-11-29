import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { renderModuleFactory } from '@angular/platform-server'
import { enableProdMode } from '@angular/core'
import * as express from 'express';
import { join } from 'path';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import * as request from 'request';
import * as path from 'path';

enableProdMode();

const PORT = process.env.PORT || 4200;
const DIST_FOLDER = join(process.cwd(), 'dist');

const app = express();

const template = fs.readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();
// const { AppServerModuleNgFactory } = require('main.server');

app.engine('html', (_, options, callback) => {
  const opts = { document: options._template, url: options.route };
  console.log("Engine rendering");
  console.log(Object.keys(options));
  console.log(options.route,options.template);
  console.log("befor eval");
  const lib = eval(options._AppServerModuleNgFactory);
  console.log("after eval");
  renderModuleFactory( lib.AppServerModuleNgFactory , opts)
    .then(html => callback(null, html));
});

// app.engine('html', (_, options, callback) => {
//   const opts = { document: template, url: options.req.url };
//
//   renderModuleFactory(AppServerModuleNgFactory, opts)
//     .then(html => callback(null, html));
// });




app.set('view engine', 'html');
app.set('views', 'src');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

app.get('shopping_cart', (req, res) => {
  res.json({});
});

app.get('/renderedAPP',(req,res)=>{
  render(req.query).then((html)=>{
    res.send(html);
  }).catch((err)=>{
    res.status(400);
    res.send(err);
  });
});

app.get('/',(req,res)=>{
  res.render('index', { req } );
});

app.get('*', (req, res) => {
  res.status(404);
  res.send('Not Found');
});




const render = function(data){
  return new Promise((resolve,reject)=>{
    // if(data.route && data.template && data.serverBundle){
    //   request(data.template, {encoding: 'utf8'}, function(error, response, body) {
    //     data._template = body;
    //     request(data.serverBundle, {encoding: 'utf8'}, function(error, response, body) {
    //       data._AppServerModuleNgFactory = body;
    //       // COMPILE MAIN.SERVER THROUGH NEW WEBPACK
    //       app.render('index',data,(err, html)=>{
    //         if(err){
    //           console.log("There's an eror",err);
    //           reject(err);
    //         }else{
    //           resolve(html);
    //         }
    //       });
    //     });
    //   });
    // }else{
    //   reject("Malformed request.")
    // }
    resolve("hi");
  })
}

module.exports.render = render;
