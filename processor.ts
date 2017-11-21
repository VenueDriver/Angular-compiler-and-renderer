import { ProcessorService } from './lib/processor-service';


module.exports.compile = (project,context,callback)=>{
  const processorService = new ProcessorService();
  processorService.compile(project,context,callback);
}
