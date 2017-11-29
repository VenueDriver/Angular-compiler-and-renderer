import { ProcessorService } from './lib/processor-service';
const processorService = new ProcessorService();

module.exports.compile = async function(event, context, callback) {
  callback(null, await processorService.compile({}));
};

module.exports.render = function(event, context, callback) {
  processorService.render().then((html)=>{
    callback(null,{ statusCode : 201 , body : html});
  })
};
