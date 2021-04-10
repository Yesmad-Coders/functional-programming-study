import 'regenerator-runtime/runtime';
import log from '../../lib/log';
import { go, filter, curry, reduce, map } from '../../lib/fx';

// HTML로 출력하기
const products = [
  { name: '반팔티', price: 15000, quantity: 1, isSelected: true },
  { name: '긴팔티', price: 20000, quantity: 2, isSelected: false },
  { name: '핸드폰케이스', price: 15000, quantity: 3, isSelected: true },
  { name: '후드티', price: 30000, quantity: 4, isSelected: false },
  { name: '바지', price: 25000, quantity: 5, isSelected: false },
];
const add = (a, b) => a + b;
const sum = curry((f, iter) => go(iter, map(f), reduce(add)));
const totalQuantity = sum((p) => p.quantity);
const totalPrice = sum((p) => p.price * p.quantity);

document.querySelector('#cart').innerHTML = `
  <table>
    <tr>
      <th></th>
      <th>상품 이름</th>
      <th>가격</th>
      <th>수량</th>
      <th>총 가격</th>
    </tr>
    ${sum(
      (p) => `
          <tr>
            <td><input type="checkbox" ${p.isSelected ? 'checked' : ''} /></td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td><input type="number" value="${p.quantity}" /></td>
            <td>${p.price * p.quantity}</td>
          </tr>
        `,
      products
    )}
    <tr>
      <td colspan="3">합계</td>
      <td>${totalQuantity(filter((p) => p.isSelected, products))}</td>
      <td>${totalPrice(filter((p) => p.isSelected, products))}</td>
    </tr>
  </table>
`;
