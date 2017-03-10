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
     * @param {string} code
     * @param {string} fileName
     * @returns {{ code: string, map: Object }}
     */
    transform (code, fileName) {
      if (!filter(fileName)) {
        return;
      }

      if (!options.type) {
        const ext = path.extname(fileName);

        if (ext) {
          options.type = ext.substr(1);
        }
      }

      return {
        code: pp.preprocess(code, context, options),
        map: { mappings: '' }
      };
    }
  };
};
