import 'regenerator-runtime/runtime';
import L from '../../lib/L';
import log from '../../lib/log';
import { go, map, filter, take, range } from '../../lib/fx';

// range, map, filter, take, reduce 중첩 사용
// 즉시 평가되는 range, map, filter를 사용한 코드
// 각 함수가 호출 즉시 평가되어 모든 반복을 진행한다.
go(
  range(10),
  map((n) => n + 10),
  filter((n) => n % 2),
  take(2),
  log
);

// 지연 평가되는 L.range, L.map, L.filter를 사용한 코드
go(
  L.range(10),
  L.map((n) => n + 10),
  L.filter((n) => n % 2),
  take(2),
  log
);
