// export default function currencyFn(num) {
//   const n = Number(num);
//   return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
//     const currency = i && c !== '.' \
// && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c;
//     return currency;
//   })}`;
// }
import { provide, inject } from 'vue';

// eslint-disable-next-line
const StoreSymbol = Symbol();

export function provideStore(store) {
  provide(StoreSymbol, store);
}

export function useStore() {
  const num = inject(StoreSymbol);
  const n = Number(num);
  return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
    const currency = i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c;
    return currency;
  })}`;
}
