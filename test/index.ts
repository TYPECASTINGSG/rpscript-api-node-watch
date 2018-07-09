import {expect} from 'chai';
import m from 'mocha';

import RPSModule from '../src/index';
import { RpsContext } from 'rpscript-interface';

m.describe('node-watch', () => {

  m.it('should watch for file change', async function () {
    let ctx = new RpsContext;
    let md = new RPSModule(ctx);

    let watching = await md.watchFile(ctx,{},"README.md");

    watching.on('change',console.log);
    watching.on('error',console.error);

  }).timeout(0);

})
