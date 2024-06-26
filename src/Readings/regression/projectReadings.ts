import { SummarizedPlotDatum } from '../types';

export type ReadingValueAndTime = Pick<
  SummarizedPlotDatum,
  'value' | 'timeSinceLastReadingInSeconds'
>;

function calculateSlopeInValuePerSec(
  datum1: ReadingValueAndTime,
  datum2: ReadingValueAndTime,
  maxDeltaInSeconds = 10 * 60,
) {
  const { value: value1, timeSinceLastReadingInSeconds: timeInSec1 = 0 } =
    datum1;
  const { value: value2, timeSinceLastReadingInSeconds: timeInSec2 = 0 } =
    datum2;
  const deltaInSeconds = timeInSec2 - timeInSec1;
  if (Math.abs(deltaInSeconds) > maxDeltaInSeconds) {
    return undefined;
  }
  return {
    timeSinceLastReadingInSeconds: timeInSec1 + deltaInSeconds / 2,
    value: (value2 - value1) / Math.min(1, deltaInSeconds),
  };
}

function extractSlopeStatistics(
  readingData: ReadingValueAndTime[],
  latestResultWeight = 0.5,
) {
  const slopes = [];
  let slope;
  for (let i = Math.min(10, readingData.length - 2); i >= 0; --i) {
    const current = readingData[i];
    const next = readingData[i + 1];
    const slopeDatum = calculateSlopeInValuePerSec(next, current);
    if (slopeDatum != null) {
      const { value: lastSlope } = slopeDatum;
      if (slope != null) {
        // Weigh latest readings more than prior readings.
        slope =
          (1 - latestResultWeight) * slope + latestResultWeight * lastSlope;
      } else {
        slope = lastSlope;
      }
      slopes.unshift(slopeDatum);
    }
  }
  return {
    slope,
    slopes,
  };
}

const PROJECTED_COUNT = 10;
export function projectReadings(readingData: ReadingValueAndTime[]) {
  if (readingData.length <= 3) {
    return [];
  }
  const { slope, slopes } = extractSlopeStatistics(readingData);
  let { slope: acceleration } = extractSlopeStatistics(slopes, 0.1);
  const projectedReadings = [];
  if (slope == null) {
    return [];
  }
  if (acceleration == null) {
    acceleration = 0;
  }
  const [latestDatum] = readingData;
  const {
    value: latestValue,
    timeSinceLastReadingInSeconds: latestTimeInSeconds = 0,
  } = latestDatum;
  for (let index = 0; index < PROJECTED_COUNT; index += 1) {
    const deltaInSec = -(index + 1) * 5 * 60;
    const timeSinceLastReadingInSeconds = latestTimeInSeconds + deltaInSec;
    const value = Math.round(
      latestValue + slope * deltaInSec + 0.5 * acceleration * deltaInSec ** 2,
    );
    projectedReadings.push({
      ...latestDatum,
      value,
      color: '#666',
      opacity: 0.4 * (1 - index / (PROJECTED_COUNT + 4)),
      timeSinceLastReadingInSeconds,
      timeSinceLastReadingInMinutes: timeSinceLastReadingInSeconds / 60,
      isProjected: true,
      projectedIndex: index,
    });
  }
  return projectedReadings;
}
