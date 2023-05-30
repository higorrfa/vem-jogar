import { Card, CardContent, Typography } from '@mui/material';

const NoRows = (): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">Nenhum grupo encontrado</Typography>
      </CardContent>
    </Card>
  );
};

export default NoRows;
