import dayjs from 'dayjs';

export const getIdFromUrl = (url: string) => url.split('/').filter(Boolean).pop();

export const formatDate = (value: string): string => dayjs(value).format('DD.MM.YYYY');

/**
 * it transforms a data key to a human-readable label
 * @param str
 */
export const transformKeyToLabel = (str: string) => {
  if (!str) return str;

  const withSpaces = str.replace(/_/g, ' ');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};
