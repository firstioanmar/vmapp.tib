// material
import { Grid } from '@material-ui/core';
import MaterialReactTable from 'material-react-table';

const datatable = [
  {
    ins_name: 'Purus Sapien PC',
    share: '$85.88',
    brokerage: '$66.90',
    add_fee: '$130.31'
  },
  {
    ins_name: 'Pede Suspendisse Institute',
    share: '$96.84',
    brokerage: '$182.50',
    add_fee: '$43.28'
  },
  {
    ins_name: 'Imperdiet Dictum Magna Industries',
    share: '$74.25',
    brokerage: '$85.82',
    add_fee: '$69.92'
  },
  {
    ins_name: 'Fusce Aliquet Incorporated',
    share: '$99.23',
    brokerage: '$70.73',
    add_fee: '$71.71'
  },
  {
    ins_name: 'Enim Diam Vel Institute',
    share: '$17.05',
    brokerage: '$54.65',
    add_fee: '$108.05'
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

export default function FinalConfirmation() {
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
