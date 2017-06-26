import fs from 'fs';
import path from 'path';
import pp from 'preprocess';
import { createFilter } from 'rollup-pluginutils';

/**
 * @param {string|string[]} [include=['**\/*.js']]
 * @param {string|string[]} [exclude='node_modules/**']
 * @param {Object} [context=process.env]
 * @param {Object} [options={}]
 * @returns {{ name: string, transform: function }}
 */
export default function RollupPluginPreprocess ({
  include = [ '**/*.js' ],
  exclude = 'node_modules/**',
  context = process && process.env || {},
  options = {}
} = {}) {

  const filter = createFilter(include, exclude);

  return {
    name: 'preprocess',

    /**
     * @param {string} fileName
     * @returns {string}
     */
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
    }
  };
};
