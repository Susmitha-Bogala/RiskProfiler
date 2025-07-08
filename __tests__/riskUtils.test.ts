import { getRiskLevel } from '../src/utils/riskUtils';

describe('getRiskLevel', () => {
  it('returns Low for score 5-9', () => {
    expect(getRiskLevel(5)).toBe('Low');
    expect(getRiskLevel(9)).toBe('Low');
  });

  it('returns Medium for score 10-14', () => {
    expect(getRiskLevel(10)).toBe('Medium');
    expect(getRiskLevel(14)).toBe('Medium');
  });

  it('returns High for score 15-21', () => {
    expect(getRiskLevel(15)).toBe('High');
    expect(getRiskLevel(21)).toBe('High');
  });

  it('defaults to High for unexpected high values', () => {
    expect(getRiskLevel(30)).toBe('High');
  });
});
