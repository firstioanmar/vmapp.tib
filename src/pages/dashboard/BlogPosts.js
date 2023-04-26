import React, { useState, useEffect } from 'react';

// material
import { Grid, Container, Typography, Card } from '@material-ui/core';
import { Icon } from '@iconify/react';
import circleToConfirmCircleTransition from '@iconify/icons-line-md/circle-to-confirm-circle-transition';
import formOutline from '@iconify/icons-mdi/form-outline';
import outlineBusinessCenter from '@iconify/icons-ic/outline-business-center';
import { alpha, styled } from '@material-ui/core/styles';
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

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function BlogPosts() {
  const [datatable, setDatatable] = useState([]);

  useEffect(() => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    axios.get('https://vm-service.tib.co.id/api/v1/getListPosting').then((response) => {
      setDatatable(response.data.data);
    });
  }, []);

  console.log(datatable);

  return (
    <Page title="Dashboard | Virtual Market">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <MaterialReactTable
              columns={columns}
              data={datatable}
              enableRowSelection
              positionToolbarAlertBanner="bottom"
              initialState={{ density: 'compact' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
