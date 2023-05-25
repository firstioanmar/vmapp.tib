import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material
import { Grid, Container } from '@material-ui/core';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
// components
import Page from '../../components/Page';

const columns = [
  {
    accessorKey: 'prospek_insd',
    header: 'Client Name'
  },
  {
    accessorKey: 'slip_no',
    header: 'Slip No'
  },
  {
    accessorKey: 'cob_code',
    header: 'COB'
  },
  {
    accessorKey: 'created_at',
    header: 'Created At'
  },
  {
    accessorKey: 'thkName',
    header: 'Tehnik By'
  }
];

// ----------------------------------------------------------------------

export default function BlogPosts() {
  const navigate = useNavigate();
  const [datatable, setDatatable] = useState([]);

  useEffect(() => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    axios.get('https://vm-service.tib.co.id/api/v1/getListPosting').then((response) => {
      setDatatable(response.data.data);
    });
  }, []);

  return (
    <Page title="Dashboard | Virtual Market">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <MaterialReactTable
              columns={columns}
              data={datatable}
              positionToolbarAlertBanner="bottom"
              initialState={{ density: 'compact' }}
              muiTableBodyRowProps={({ row }) => ({
                onClick: () => {
                  navigate(`/dashboard/detail/${row.original.id}`);
                },
                sx: {
                  cursor: 'pointer'
                }
              })}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
