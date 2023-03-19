
import { parse } from '@yagni-js/yagni-parser';
import { createFilter } from 'rollup-pluginutils';


export function yagni(options) {
  const opts = options || {};

  const filter = createFilter(opts.include || ['**/*.html', '**/*.svg'], opts.exclude);

  return {
    name: 'yagni',
    transform: (source, id) => filter(id) ? { code: parse(source), map: { mappings: '' } } : null
  };
}
