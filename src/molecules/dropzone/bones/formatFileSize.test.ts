import { formatFileSize } from './formatFileSize';

describe('formatFileSize', () => {
  test('shows sizes below 1000 bytes in bytes', () => {
    expect(formatFileSize(0, 'en')).toBe('0 byte');
    expect(formatFileSize(999, 'en')).toBe('999 byte');
  });

  // kB and the other units are each exactly 1000 times the one before
  test('counts 1000 bytes as a kilobyte', () => {
    expect(formatFileSize(1000, 'en')).toBe('1 kB');
    expect(formatFileSize(1024, 'en')).toBe('1 kB');
  });

  test('shows the size in the largest unit which keeps it at 1 or more', () => {
    expect(formatFileSize(48_200, 'en')).toBe('48.2 kB');
    expect(formatFileSize(1_500_000, 'en')).toBe('1.5 MB');
    expect(formatFileSize(2_500_000_000, 'en')).toBe('2.5 GB');
    expect(formatFileSize(3e12, 'en')).toBe('3 TB');
    expect(formatFileSize(4e15, 'en')).toBe('4 PB');
  });

  test('stays at petabytes for larger sizes, as there is no larger unit', () => {
    expect(formatFileSize(1e18, 'en')).toBe('1,000 PB');
  });

  test('rounds to one decimal, leaving out a decimal of zero', () => {
    expect(formatFileSize(1_523_456, 'en')).toBe('1.5 MB');
    expect(formatFileSize(2_000_000, 'en')).toBe('2 MB');
    expect(formatFileSize(1_960_000, 'en')).toBe('2 MB');
  });

  test('moves up a unit when rounding reaches 1000', () => {
    expect(formatFileSize(999_949, 'en')).toBe('999.9 kB');
    expect(formatFileSize(999_950, 'en')).toBe('1 MB');
  });

  test('follows the given language', () => {
    expect(formatFileSize(1_523_456, 'de')).toBe('1,5 MB');
    expect(formatFileSize(1_523_456, 'fr')).toBe('1,5 Mo');
  });
});
