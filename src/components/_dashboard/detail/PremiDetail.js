/* eslint-disable react/prop-types */
import { useState } from 'react';
// material
import { Grid, Card, CardHeader, IconButton, Collapse, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Icon } from '@iconify/react';

export default function PremiDetail() {
  const [expandPremiTotal, setExpandPRemiTOtal] = useState(true);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ py: 3, px: 3, textAlign: 'center' }}>
          <CardHeader
            action={
              <IconButton onClick={() => setExpandPRemiTOtal(!expandPremiTotal)}>
                <Icon
                  icon={expandPremiTotal ? 'material-symbols:expand-less' : 'material-symbols:expand-more'}
                  fontSize={30}
                />
              </IconButton>
            }
            titleTypographyProps={{ variant: 'h3' }}
            title="Premi Detail"
            sx={{ mb: 2 }}
          />
          <Collapse in={expandPremiTotal}>
            <Grid container spacing={2}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      FLEXAS
                    </TableCell>
                    <TableCell align="right"> %</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Collapse>
        </Card>
      </Grid>
    </Grid>
  );
}
