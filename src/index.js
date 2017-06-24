import fs from 'fs';
import path from 'path';
import pp from 'preprocess';
import { createFilter } from 'rollup-pluginutils';

import { parse } from 'acorn';
import { walk } from 'estree-walker';
import MagicString from 'magic-string';

/**
 * @param {string|string[]} [include=['**\/*.js']]
 * @param {string|string[]} [exclude='node_modules/**']
 * @param {Object} [context=process.env]
 * @param {boolean} [sourceMap=false]
 * @param {Object} [options={}]
 * @returns {{ name: string, transform: function }}
 */
export default function RollupPluginPreprocess ({
  include = [ '**/*.js' ],
  exclude = 'node_modules/**',
  context = process && process.env || {},
  sourceMap = false,
  options = {}
} = {}) {

  const filter = createFilter(include, exclude);

  return {
    name: 'preprocess',

    load (fileName) {
      let data = fs.readFileSync(fileName);

      if (filter(fileName)) {
        if (!options.type) {
          const ext = path.extname(fileName);

          if (ext) {
            options.type = ext.substr(1);
          }
        }

        data = pp.preprocess(data, context, options);
      }

      return data;
    },

    /**
     * @param {string} code
     * @param {string} fileName
     * @returns {{ code: string, map: Object }}
     */
    // transform (code, fileName) {
    //   if (!filter(fileName)) {
    //     return;
    //   }

    //   if (!options.type) {
    //     const ext = path.extname(fileName);

    //     if (ext) {
    //       options.type = ext.substr(1);
    //     }
    //   }

    //   code = pp.preprocess(code, context, options);
    //   let map = { mappings: '' };

    //   if (sourceMap && options.type === 'js') {
    //     const magic = new MagicString(code);
    //     // const ast = parse(code, {
    //     //   ecmaVersion: 6,
    //     //   sourceType: 'module'
    //     // });

    //     // walk(ast, {
    //     //   enter: function (node, parent) {
    //     //     magic.addSourcemapLocation(node.start);
    //     //     magic.addSourcemapLocation(node.end);

    //     //     if (node.type === "Literal" && typeof node.value === "string") {
    //     //       var raw0 = node.raw,
    //     //           raw1 = jsesc(node.value, {wrap: true, quotes: raw0[0] === "'" ? "single" : "double"});
    //     //       if (raw0 !== raw1) {
    //     //         magic.overwrite(node.start, node.end, raw1);
    //     //       }
    //     //     }
    //     //   }
    //     // });

    //     code = magic.toString();
    //     map = magic.generateMap({
    //       hires: true,
    //       includeContent: true
    //     });
    //   }

    //   return { code, map };
    // }
  };
};
