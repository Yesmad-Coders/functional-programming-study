import 'regenerator-runtime/runtime';
import L from '../../lib/L';
import log from '../../lib/log';
import { go, map, filter, take, range } from '../../lib/fx';

// 결과를 만드는 함수 reduce, take
// map, filter와 같은 함수는 지연성을 갖는다.
// reduce, take와 같은 함수는 값을 꺼내 연산을 시키는 함수다.
