// @ts-expect-error Ignore untyped package
import regression from '@jazeee/regression';
import { SummarizedPlotDatum } from '../types';

interface IProjectedPlotDatum extends SummarizedPlotDatum {
  isProjected: boolean;
  projectedIndex: number;
}

const READING_COUNT = 10;
const PROJECTED_COUNT = 10;
export function projectReadings(
  readingData: SummarizedPlotDatum[],
  highAxis: number,
): IProjectedPlotDatum[] {
  const lastReadings = readingData.slice(0, READING_COUNT);
  const weightedLastReadings = [];
  // Weigh newest readings more
  for (let i = 0; i < lastReadings.length; i += 1) {
    for (let j = 0; j < (READING_COUNT - i) / 3; j += 1) {
      weightedLastReadings.push(lastReadings[i]);
    }
  }
  const arrayPairs = weightedLastReadings.map(
    ({ value, timeSinceLastReadingInSeconds }) => [
      timeSinceLastReadingInSeconds ?? 0,
      value,
    ],
  );
  if (arrayPairs.length <= 3) {
    return [];
  }
  const [firstPair] = arrayPairs;
  const [lastPair] = arrayPairs.slice(-1);
  if (lastPair[0] - firstPair[0] > READING_COUNT * 2 * 5 * 60) {
    return [];
  }

  const { equation: coefficients, residuals } = regression.polynomial(
    arrayPairs,
    {
      order: 2,
      precision: 8,
    },
  );
  const [acceleration, slope] = coefficients;
  const meanSquared = residuals
    .map(
      ([
        ,
        // @ts-expect-error ignore ts error here for now
        value,
      ]) => value ** 2,
    )
    .reduce((accumulator: number, x: number) => accumulator + x, 0);
  const rmsResiduals = meanSquared ** 0.5;
  if (rmsResiduals > highAxis / 4) {
    // Scan for anomalies - do not provide projected data if there are odd steps.
    console.debug(
      `Not projecting data due to high rmsResiduals: ${rmsResiduals} with coefficients: ${coefficients}`,
    );
    return [];
  }
  const [latestDatum] = readingData;
  const {
    value: latestValue,
    timeSinceLastReadingInSeconds: latestTimeInSeconds = 0,
  } = latestDatum;
  const projectedReadings = [];

  for (let index = 0; index < PROJECTED_COUNT; index += 1) {
    const deltaInSec = -(index + 1) * 5 * 60;
    const timeSinceLastReadingInSeconds = latestTimeInSeconds + deltaInSec;
    const value = Math.round(
      latestValue + slope * deltaInSec + acceleration * deltaInSec ** 2,
    );
    projectedReadings.push({
      ...latestDatum,
      value,
      color: '#666',
      opacity: 0.6 * (1 - index / (PROJECTED_COUNT - 2)),
      timeSinceLastReadingInSeconds,
      timeSinceLastReadingInMinutes: timeSinceLastReadingInSeconds / 60,
      isProjected: true,
      projectedIndex: index,
    });
  }
  return projectedReadings;
}
