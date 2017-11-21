import { ProcessorService } from './lib/processor-service';

module.exports.compile = async function(event, context, callback) {
  const processorService = new ProcessorService();
  callback(null, await processorService.compile({}));
};
