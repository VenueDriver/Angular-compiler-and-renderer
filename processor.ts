const NgRenderer = require("./lib/ng-renderer").NgRenderer;
const renderer = new NgRenderer();

// module.exports.compile = async function(event, context, callback) {
//   callback(null, await processorService.compile({}));
// };

module.exports.render = function(ev, context, callback) {
  if(ev.queryStringParameters && ev.queryStringParameters.serverBundle && ev.queryStringParameters.template && ev.queryStringParameters.route){
    let data = {
      serverBundle : ev.queryStringParameters.serverBundle,
      template : ev.queryStringParameters.template,
      route : ev.queryStringParameters.route
    };
    // callback(null,{ statusCode : 201 , body : JSON.stringify(data)});
    renderer.render(data).then((html)=>{
      callback(null,{ statusCode : 201 , body : html });
    }).catch((e)=>{
      if(typeof e == "object") e = JSON.stringify(e);
      callback(null,{ statusCode : 201 , body : "Error:"+e });
    })
  }else{
    callback(null,{ statusCode : 400 , body : "Specify \"template\",\"serverBundle\" and \"route\"."});
  }
};
