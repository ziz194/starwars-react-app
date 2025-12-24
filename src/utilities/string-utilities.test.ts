import { formatDate, getIdFromUrl, transformKeyToLabel } from './string-utilities';

describe('string utilities', () => {
  describe('getIdFromUrl', () => {
    it('returns the last path segment from a valid URL with trailing slash', () => {
      expect(getIdFromUrl('https://swapi.dev/api/films/1/')).toBe('1');
    });

    it('returns the last path segment from a URL without trailing slash', () => {
      expect(getIdFromUrl('https://swapi.dev/api/people/42')).toBe('42');
    });

    it('returns undefined when url is undefined', () => {
      expect(getIdFromUrl(undefined)).toBeUndefined();
    });
  });

  describe('formatDate', () => {
    it('formats an ISO date to DD.MM.YYYY', () => {
      expect(formatDate('1977-05-25')).toBe('25.05.1977');
    });
  });

  describe('transformKeyToLabel', () => {
    it('capitalizes the first letter', () => {
      expect(transformKeyToLabel('name')).toBe('Name');
    });

    it('replaces underscores with spaces', () => {
      expect(transformKeyToLabel('release_date')).toBe('Release date');
    });

    it('handles multiple underscores', () => {
      expect(transformKeyToLabel('created_at_time')).toBe('Created at time');
    });
  });
});
