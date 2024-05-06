import { ReadingValueAndTime, projectReadings } from './projectReadings'; // Replace with actual path

describe('projectReadings', () => {
  it('returns empty array for less than 3 data points', () => {
    const readingData: ReadingValueAndTime[] = [
      {
        value: 70,
        timeSinceLastReadingInSeconds: 60,
      },
    ];
    const projectedReadings = projectReadings(readingData);
    expect(projectedReadings).toEqual([]);
  });

  it('returns empty array for data gap exceeding threshold', () => {
    const readingData = [
      { value: 70, timeSinceLastReadingInSeconds: 60 },
      { value: 80, timeSinceLastReadingInSeconds: 36000 }, // Large gap
    ];
    const projectedReadings = projectReadings(readingData);
    expect(projectedReadings).toEqual([]);
  });

  it('returns projected readings for valid data and low residuals', () => {
    const readingData = [
      { value: 110, timeSinceLastReadingInSeconds: 60 },
      { value: 115, timeSinceLastReadingInSeconds: 120 },
      { value: 120, timeSinceLastReadingInSeconds: 180 },
      { value: 122, timeSinceLastReadingInSeconds: 240 },
      { value: 125, timeSinceLastReadingInSeconds: 300 },
    ];
    const projectedReadings = projectReadings(readingData);
    expect(projectedReadings.length).toBe(10);
    expect(
      projectedReadings
        .map(({ isProjected }) => isProjected)
        .every((isProjected) => isProjected === true),
    ).toBe(true);
    expect(projectedReadings[0].isProjected).toBeTruthy(); // First element is projected
    expect(projectedReadings.map(({ value }) => value).slice(0, 3)).toEqual([
      95, 93, 105,
    ]);
    expect(
      projectedReadings.map(({ opacity }) => opacity.toFixed(2)).slice(0, 3),
    ).toEqual(['0.40', '0.37', '0.34']);
  });
});
