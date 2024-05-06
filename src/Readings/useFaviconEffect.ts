import { useEffect } from 'react';
import { useReadingsContext } from './api';
import { isDefined } from '../utils/isDefined';
import { setFavicon } from '../Favicon/utils';

function getColors(value: number | undefined) {
  if (!isDefined(value)) {
    return {
      backgroundColor: '#666',
      textColor: '#000',
    };
  }
  if (value < 70) {
    return {
      backgroundColor: '#e22',
      textColor: '#FFF',
    };
  }
  if (value > 140) {
    return {
      backgroundColor: '#fc2',
      textColor: '#000',
    };
  }
  return {
    backgroundColor: '#040',
    textColor: '#FFF',
  };
}

export function useReadingFaviconEffect() {
  const { latestReadingValue } = useReadingsContext();

  useEffect(() => {
    console.log(`Setting icon value to ${latestReadingValue}`);
    setFavicon({
      text: isDefined(latestReadingValue) ? `${latestReadingValue}` : '?',
      ...getColors(latestReadingValue),
    });
  }, [latestReadingValue]);
}
