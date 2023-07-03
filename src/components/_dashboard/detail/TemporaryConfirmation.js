// material
import { Grid } from '@material-ui/core';
import MaterialReactTable from 'material-react-table';

const datatable = [
  {
    ins_name: 'Eu Ligula LLP'
  },
  {
    ins_name: 'Dui PC'
  },
  {
    ins_name: 'Vestibulum PC'
  },
  {
    ins_name: 'Ante Institute'
  },
  {
    ins_name: 'Semper Pretium Limited'
  }
];

const columns = [
  {
    accessorKey: 'ins_name',
    header: 'Name'
  }
];

export default function TemporaryConfirmation() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12}>
        <MaterialReactTable
          columns={columns}
          data={datatable}
          enableRowNumbers
          positionToolbarAlertBanner="bottom"
          initialState={{ density: 'compact' }}
        />
      </Grid>
    </Grid>
  );
}
