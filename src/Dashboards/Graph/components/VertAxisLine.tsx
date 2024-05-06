import { SvgText } from "./SvgText";

interface Props {
  x: number;
  height: number;
  color: string;
  value: string;
}

export function VertAxisLine(props: Props) {
  const { x, height, value, color } = props;
  return (
    <>
      <line
        x1={x}
        x2={x}
        y1={0}
        y2={height}
        stroke={color}
        strokeWidth={1}
        opacity={0.25}
      />
      <SvgText
        x={x}
        y={height}
        color={color}
        fontSize={16}
        opacity={1}
        textAnchor="middle"
      >
        {value}
      </SvgText>
    </>
  );
}
