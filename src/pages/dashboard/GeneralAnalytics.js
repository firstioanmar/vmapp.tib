import React, { useState, useEffect } from 'react';

// material
import { Grid, Container, Typography, Card } from '@material-ui/core';
import { Icon } from '@iconify/react';
import circleToConfirmCircleTransition from '@iconify/icons-line-md/circle-to-confirm-circle-transition';
import formOutline from '@iconify/icons-mdi/form-outline';
import outlineBusinessCenter from '@iconify/icons-ic/outline-business-center';
import { alpha, styled } from '@material-ui/core/styles';
import MaterialReactTable from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axios from 'axios';
// components
import Page from '../../components/Page';

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 40
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    size: 120
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    size: 120
  },
  {
    accessorKey: 'company',
    header: 'Company',
    size: 300
  },
  {
    accessorKey: 'city',
    header: 'City'
  },
  {
    accessorKey: 'country',
    header: 'Country',
    size: 220
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

export default function GeneralAnalytics() {
  const [datatable, setDatatable] = useState([]);

  useEffect(() => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    axios.get('https://vm-service.tib.co.id/api/v1/getListPosting').then((response) => {
      setDatatable(response.data);
    });
  });
  return (
    <Page title="Dashboard | Virtual Market">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <RootStyle>
              <IconWrapperStyle>
                <Icon icon={formOutline} width={24} height={24} />
              </IconWrapperStyle>
              <Typography variant="h3">105</Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Total Offerslip
              </Typography>
            </RootStyle>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <RootStyle>
              <IconWrapperStyle>
                <Icon icon={circleToConfirmCircleTransition} width={24} height={24} />
              </IconWrapperStyle>
              <Typography variant="h3">80</Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Total Confirmation
              </Typography>
            </RootStyle>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <RootStyle>
              <IconWrapperStyle>
                <Icon icon={outlineBusinessCenter} width={24} height={24} />
              </IconWrapperStyle>
              <Typography variant="h3">87</Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Total COB
              </Typography>
            </RootStyle>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <MaterialReactTable
              columns={columns}
              data={datatable}
              enableRowSelection
              positionToolbarAlertBanner="bottom"
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
