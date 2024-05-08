import { Alert, Box } from '@mui/material';
import { useReadingsContext } from '../../Readings/api';
import { ReadingsGraph } from './Graph';
import { DEFAULT_META } from '../../Readings/constants';
import { useEffect, useRef, useState } from 'react';
import { Dimensions } from './types';

export function GraphView() {
  const { readingsResponse } = useReadingsContext();
  const { isSuccess, isError, data } = readingsResponse;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [graphDimensions, setGraphDimensions] = useState<Dimensions>({
    width: 100,
    height: 100,
  });
  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current;
      const observer = new ResizeObserver(() => {
        const { clientWidth, clientHeight } = element;
        setGraphDimensions({
          width: clientWidth,
          height: clientHeight,
        });
      });
      observer.observe(element);
      return () => {
        observer.disconnect();
      };
    }
  });
  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'absolute',
        top: 8,
        left: 8,
        right: 8,
        bottom: 8,
      }}
    >
      {isError && (
        <Alert variant="filled" color="error">
          Error Reading Data
        </Alert>
      )}
      {isSuccess && (
        <Box>
          <ReadingsGraph
            dimensions={graphDimensions}
            plotSettings={DEFAULT_META}
            readings={data.readings}
          />
        </Box>
      )}
    </Box>
  );
}
