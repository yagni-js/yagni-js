
import { view as layoutView } from './layout.html';

const tree = layoutView({username: 'John Smith', extraClasses: 'foo baz bar'});

export { tree };
