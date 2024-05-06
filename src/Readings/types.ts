export interface PlotDimensions {
  plotWidth: number;
  plotHeight: number;
}

export enum Trend {
  DoubleDown = 'DoubleDown',
  SingleDown = 'SingleDown',
  FortyFiveDown = 'FortyFiveDown',
  Flat = 'Flat',
  FortyFiveUp = 'FortyFiveUp',
  SingleUp = 'SingleUp',
  DoubleUp = 'DoubleUp',
}

export interface PlotDatumDateProps {
  timeInMilliseconds?: number;
  timeInSeconds?: number;
  timeSinceLastReadingInSeconds?: number;
  timeSinceLastReadingInMinutes?: number;
  readingIsOld?: boolean;
  date?: Date;
}

export interface SummarizedPlotDatum extends PlotDatumDateProps {
  value: number;
  trend: Trend;
  isHigh: boolean;
  isLow: boolean;
  isInRange: boolean;
  color: string;
  opacity?: number;
  isProjected?: boolean;
  projectedIndex?: number;
}

export interface PlotSettings {
  minScale: number;
  maxScale: number;
  lowWarning: number;
  highWarning: number;
  lowAxis: number;
  highAxis: number;
  higherAxis: number;
  units: string;
}
