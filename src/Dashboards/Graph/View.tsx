import { Alert, Container } from '@mui/material';
import { useReadingsContext } from '../../Readings/api';
import { ReadingsGraph } from './Graph';
import { DEFAULT_META } from '../../Readings/constants';

export function GraphView() {
  const { readingsResponse } = useReadingsContext();
  const { isSuccess, isError, data } = readingsResponse;
  return (
    <Container maxWidth="xl">
      {isError && (
        <Alert variant="filled" color="error">
          Error Reading Data
        </Alert>
      )}
      {isSuccess && (
        <ReadingsGraph
          width={1400}
          height={500}
          plotSettings={DEFAULT_META}
          readings={data.readings}
        />
      )}
    </Container>
  );
}
