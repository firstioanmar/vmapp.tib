/* eslint-disable react/prop-types */
// material
import { Grid } from '@material-ui/core';
import MaterialReactTable from 'material-react-table';

const columns = [
  {
    accessorKey: 'ins_name',
    header: 'Name'
  },
  {
    accessorKey: 'share',
    header: 'Share'
  },
  {
    accessorKey: 'brokerage',
    header: 'Brokerage'
  },
  {
    accessorKey: 'add_fee',
    header: 'Additional Fee'
  }
];

export default function FinalSecurity({ finalSecurity }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12}>
        <MaterialReactTable
          columns={columns}
          data={finalSecurity}
          enableRowNumbers
          positionToolbarAlertBanner="bottom"
          initialState={{ density: 'compact' }}
        />
      </Grid>
    </Grid>
  );
}
