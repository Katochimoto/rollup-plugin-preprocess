# rollup-plugin-preprocess
Preprocess HTML, JavaScript, and other files with Rollup and Preprocess.


[![Build Status][build]][build-link] [![NPM version][version]][version-link] [![Dependency Status][dependency]][dependency-link] [![devDependency Status][dev-dependency]][dev-dependency-link]

```js
// rollup.config.js
import RollupPluginPreprocess from 'rollup-plugin-preprocess';

// ...

export default {
  // ...
  plugins: [
    RollupPluginPreprocess({
      context: {
        DEBUG: true
      }
    })
  ]
};
```

[build]: https://travis-ci.org/Katochimoto/rollup-plugin-preprocess.svg?branch=master
[build-link]: https://travis-ci.org/Katochimoto/rollup-plugin-preprocess
[version]: https://badge.fury.io/js/rollup-plugin-preprocess.svg
[version-link]: http://badge.fury.io/js/rollup-plugin-preprocess
[dependency]: https://david-dm.org/Katochimoto/rollup-plugin-preprocess.svg
[dependency-link]: https://david-dm.org/Katochimoto/rollup-plugin-preprocess
[dev-dependency]: https://david-dm.org/Katochimoto/rollup-plugin-preprocess/dev-status.svg
[dev-dependency-link]: https://david-dm.org/Katochimoto/rollup-plugin-preprocess#info=devDependencies
