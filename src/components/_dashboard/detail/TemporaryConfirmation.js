/* eslint-disable react/prop-types */

// material
import { Grid } from '@material-ui/core';
import MaterialReactTable from 'material-react-table';

const columns = [
  {
    accessorKey: 'insName',
    header: 'Insurance Name'
  },
  {
    accessorKey: 'insStatus',
    header: 'Status'
  }
];

export default function TemporaryConfirmation({ temporaryIns }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12}>
        <MaterialReactTable
          columns={columns}
          data={temporaryIns}
          enableRowNumbers
          positionToolbarAlertBanner="bottom"
          initialState={{ density: 'compact' }}
        />
      </Grid>
    </Grid>
  );
}
