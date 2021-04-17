import 'regenerator-runtime/runtime';
import log from '../../lib/log';
import { pipe, map, reduce } from '../../lib/fx';

// queryStr 함수 만들기
const queryStr = pipe(
  Object.entries,
  map(([key, value]) => `${key}=${value}`),
  reduce((a, b) => `${a}&${b}`)
);
log(queryStr({ limit: 10, offset: 10, type: 'notice' }));
// limit=10&offset=10&type=notice
