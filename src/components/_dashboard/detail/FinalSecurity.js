// material
import { Grid } from '@material-ui/core';
import MaterialReactTable from 'material-react-table';

const datatable = [
  {
    ins_name: 'Lectus A Industries',
    share: '$13.56',
    brokerage: '$180.30',
    add_fee: '$45.14'
  },
  {
    ins_name: 'Aliquam Adipiscing Institute',
    share: '$77.89',
    brokerage: '$189.61',
    add_fee: '$1.40'
  },
  {
    ins_name: 'Integer Urna Vivamus Inc.',
    share: '$86.88',
    brokerage: '$57.99',
    add_fee: '$25.32'
  },
  {
    ins_name: 'Urna Vivamus Inc.',
    share: '$46.84',
    brokerage: '$101.10',
    add_fee: '$63.78'
  },
  {
    ins_name: 'Eu Nulla LLC',
    share: '$63.06',
    brokerage: '$45.02',
    add_fee: '$75.48'
  }
];

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

export default function FinalSecurity() {
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
