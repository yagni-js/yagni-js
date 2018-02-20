
import { parse } from '@yagni-js/yagni-parser';
import { createFilter } from 'rollup-pluginutils';


export default function yagni(options) {
  const opts = options || {};

  const filter = createFilter(options.include || ['**/*.html', '**/*.svg'], options.exclude);

  return {
    name: 'yagni',
    transform: function transform(source, id) {

      // eslint-disable-next-line fp/no-nil,better/no-ifs
      if (!filter(id)) return null;

      const code = parse(source);

      return {
        code: code,
        map: {mappings: ''}
      };
    }
  };
}
