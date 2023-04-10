import { add, formatString } from './utilities';
import { FixedNumber } from 'ethers';

describe('test utils', () => {
  it('add test', function () {
    expect(add(1, 2)).toBe(3);
    expect(formatString('2.22', 2)).toBe(FixedNumber.from(2.22));
  });
});
