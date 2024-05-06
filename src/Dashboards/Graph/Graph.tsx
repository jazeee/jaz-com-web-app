import { Fragment } from 'react';
import { AxisLine } from './components/AxisLine';
import { VertAxisLine } from './components/VertAxisLine';
import { format, subMinutes } from 'date-fns';
import { SummarizedPlotDatum, PlotSettings } from '../../Readings/types';
import { SvgText } from './components/SvgText';
import { projectReadings } from '../../Readings/regression/projectReadings';

interface Props {
  readings: SummarizedPlotDatum[] | undefined;
  width: number;
  height: number;
  plotSettings: PlotSettings;
}

const FUTURE_TIME_IN_SECONDS = 40 * 60;

export function ReadingsGraph(props: Props) {
  const { width, height, readings, plotSettings } = props;
  if (!width || !height || !readings || !readings.length || !plotSettings) {
    return null;
  }
  const {
    minScale, //: 30,
    lowAxis, //: 70,
    highAxis, //: 140,
    higherAxis, //: 160,
    maxScale, //: 250,
    units, // 'mg/dL'
  } = plotSettings;
  const calcTimePosition = (value: number) => {
    const scaleRatio = height / 6000;
    if (width < 600) {
      // Leave enough space for 5 minutes of future data.
      return width - (value + FUTURE_TIME_IN_SECONDS / 8) * scaleRatio;
    }
    // Leave enough space for 40 minutes of future data.
    return width - (value + FUTURE_TIME_IN_SECONDS) * scaleRatio;
  };
  const calcValuePosition = (value: number) => {
    let heightRatio = 1 - (value - minScale) / (maxScale - minScale);
    heightRatio = Math.max(0, heightRatio);
    heightRatio = Math.min(1, heightRatio);
    return height * heightRatio;
  };

  const [lastReadingDatum] = readings;
  const { color: lastReadingColor, isInRange } = lastReadingDatum;
  const projectedReadings = projectReadings(readings);
  const dateAxisValues = [];
  const now = Date.now();
  for (let i = 0; i <= 5 * 60; i += 60) {
    dateAxisValues.push({
      x: calcTimePosition(i * 60),
      value: format(subMinutes(now, i), 'hh:mm a'),
    });
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        stroke={lastReadingColor}
        strokeWidth={isInRange ? 1 : 6}
        fill="none"
        opacity={isInRange ? 0.2 : 0.5}
      />
      <AxisLine
        y={calcValuePosition(lowAxis)}
        units={units}
        width={width}
        color="red"
        value={lowAxis}
      />
      <AxisLine
        y={calcValuePosition(highAxis)}
        units={units}
        width={width}
        color="#666"
        value={highAxis}
      />
      <AxisLine
        y={calcValuePosition(higherAxis)}
        units={units}
        width={width}
        color="yellow"
        value={higherAxis}
      />
      {[...readings, ...projectedReadings].map((datum, index) => {
        const {
          value,
          timeSinceLastReadingInSeconds = 0,
          color,
          isProjected,
          projectedIndex,
          opacity = 1.0,
        } = datum;
        const x = calcTimePosition(timeSinceLastReadingInSeconds);
        const y = calcValuePosition(value);
        const textAnchor = (width - x) / width < 0.1 ? 'end' : 'middle';
        return (
          <Fragment key={index}>
            <circle
              cx={x}
              cy={y}
              r="5"
              stroke={isProjected ? color : 'white'}
              strokeWidth="1.5"
              fill={color}
              opacity={opacity}
            />
            {(projectedIndex === 5 || (!isProjected && index % 5 === 0)) && (
              <SvgText
                x={x}
                y={y}
                color={color}
                textAnchor={textAnchor}
                opacity={isProjected ? 0.8 : 1.0}
                yOffset={8}
                fontSize={16}
              >
                {value}
              </SvgText>
            )}
          </Fragment>
        );
      })}
      {dateAxisValues.map((axis) => {
        const { x, value } = axis;
        return (
          <VertAxisLine
            key={x}
            x={x}
            height={height}
            color="#666"
            value={value}
          />
        );
      })}
    </svg>
  );
}
