angular.module('myModule', [
  'dep1',
  'dep2'
  /* @if NODE_ENV='production' **
  , 'prod_dep'
  /* @endif */
  /* @exclude **
  , 'debug_dep'
  /* @endexclude */
]);
