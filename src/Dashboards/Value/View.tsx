import { Alert, Container, Typography } from '@mui/material';
import { useReadingsContext } from '../../Readings/api';
import { isDefined } from '../../utils/isDefined';

export function ValueView() {
  const { readingsResponse, latestReading } = useReadingsContext();
  const { isError } = readingsResponse;
  return (
    <Container maxWidth="md">
      {isError && (
        <Alert variant="filled" color="error">
          Error Reading Data
        </Alert>
      )}
      {isDefined(latestReading) && (
        <Typography variant="h1">
          Value is {latestReading.value}, Trending: {latestReading.trend}
        </Typography>
      )}
    </Container>
  );
}
