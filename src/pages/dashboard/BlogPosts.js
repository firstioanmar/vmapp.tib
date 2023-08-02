import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material
import { Grid, Container } from '@material-ui/core';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

// components
import Page from '../../components/Page';

const columns = [
  {
    accessorKey: 'prospek_insd',
    header: 'Insured Name'
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
    accessorKey: 'request_status',
    header: 'Status'
  },
  {
    accessorKey: 'created_by',
    header: 'Tehnik By'
  }
];

export default function BlogPosts() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [datatable, setDatatable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listData = await axios.get('https://vm-service.tib.co.id/api/placing/list-data', {
          params: { type: 1 },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.access_token}`
          }
        });

        const dataTable = await listData.data;
        if (dataTable.status === 200) {
          setDatatable(dataTable.message);
        }
      } catch (error) {
        // Check for token expired error (example: HTTP 401 Unauthorized)
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

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
                  navigate(`/offerslip/detail/${row.original.req_stat_id}`);
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
