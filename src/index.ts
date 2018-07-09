/**
 * @module node-watch
 */

import watch from 'node-watch';
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';
import { EventEmitter } from 'events';

let MOD_ID = "node-watch"

export interface NodeWatchContext{
  watcher:any;
}

@RpsModule(MOD_ID)
export default class RPSModule {

  constructor(ctx:RpsContext){
  }

  @rpsAction({verbName:'watching-file'})
  async watchFile (ctx:RpsContext,opts:Object, filename:string) : Promise<EventEmitter>{
    let w = watch(filename,opts);

    ctx.addModuleContext(MOD_ID,{watcher:w});

    return w;
  }

  @rpsAction({verbName:'stop-watching'})
  async stopWatching (ctx:RpsContext,opts:Object, filename:string) : Promise<void>{
    let w = ctx.getModuleContext(MOD_ID);
    if (w){
      if(!w['watcher'].isClosed()) w.close();
    }
  }

}
