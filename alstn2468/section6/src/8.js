import 'regenerator-runtime/runtime';
import L from '../../lib/L';
import log from '../../lib/log';
import { go, take } from '../../lib/fx';

// L.range, L.map, L.filter, take 의 평가 순서
go(
  L.range(10),
  L.map((n) => n + 10), // filter의 내부의 next 호출 시 range로 이동
  L.filter((n) => n % 2), // take에서 내부의 next 호출 시 filter로 이동
  take(2), // take가 가장 먼저 평가된다.
  log
);

// 코드가 가로로 평가되는 것이 아니라 세로로 평가된다.
// | 0     | 1    | 2     | 3    |
// | 10    | 11   | 12    | 13   |
// | false | true | false | true |
