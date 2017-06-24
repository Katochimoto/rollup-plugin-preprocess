import fs from 'fs';
import path from 'path';
import { rollup } from 'rollup';
import { assert } from 'chai';
import RollupPluginPreprocess from '../src/index.js';

describe('rollup-plugin-preprocess', function () {
  it('должен заменить переменную', function () {
    return rollup({
      entry: path.join(__dirname, 'samples', 'test1.js'),
      plugins: [
        RollupPluginPreprocess({
          context: {
            VAR: 'test'
          }
        })
      ]
    }).then(bundle => {
      const result = bundle.generate({
        sourceMap: false,
        useStrict: false,
        format: 'cjs'
      });

      assert(result.code.trim() === 'module.export = \'test\';');
    });
  });

  describe.only('sourceMap', function () {
    it('должен построить правильный сорсмап', function () {
      return rollup({
        entry: path.join(__dirname, 'samples', 'test2.js'),
        plugins: [
          RollupPluginPreprocess({
            sourceMap: true,
            context: {
              NODE_ENV: 'production'
            }
          })
        ]
      }).then(bundle => {
        const result = bundle.generate({
          sourceMap: true,
          useStrict: false,
          format: 'cjs'
        });

        console.log('>>1', JSON.stringify(result.code.trim()));
        console.log('>>2', result.map.toString());

        assert(result.code.trim() === 'module.export = \'test\';');
        assert(result.map.toString() === 'module.export = \'test\';');
      });
    });
  });
});
