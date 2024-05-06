import { useQuery } from '@tanstack/react-query';
import { SummarizedPlotDatum } from './types';
import constate from 'constate';

function useReadings() {
  const readingsResponse = useQuery({
    queryKey: ['readings'],
    queryFn: async () => {
      const response = await fetch('http://localhost:4242/readings');
      const readings: { readings: SummarizedPlotDatum[] } =
        await response.json();
      return readings;
    },
    refetchInterval: 1 * 60 * 1000,
    refetchIntervalInBackground: true,
    staleTime: 0.5 * 60 * 1000,
  });
  const { data, isSuccess } = readingsResponse;
  const latestReading = isSuccess ? data.readings[0] : undefined;
  const latestReadingValue = latestReading?.value;
  return { readingsResponse, latestReading, latestReadingValue };
}

export const [ReadingsProvider, useReadingsContext] = constate(useReadings);
