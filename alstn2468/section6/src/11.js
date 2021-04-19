import 'regenerator-runtime/runtime';
import L from '../../lib/L';
import log from '../../lib/log';
import { go, map, filter, take, range } from '../../lib/fx';

// ES6의 기본 규악을 통해 구현하는 지연 평가의 장점
// ES6 규약인 제너레이터를 이용해 만드는 지연 평가는 어떤 라이브러리를 이용해도 합성할 수 있다.
