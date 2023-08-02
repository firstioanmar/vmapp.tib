import React from 'react';

// material
import { Grid, Container, Typography, Card } from '@material-ui/core';
import { Icon } from '@iconify/react';
import circleToConfirmCircleTransition from '@iconify/icons-line-md/circle-to-confirm-circle-transition';
import formOutline from '@iconify/icons-mdi/form-outline';
import outlineBusinessCenter from '@iconify/icons-ic/outline-business-center';
import { alpha, styled } from '@material-ui/core/styles';
// components
import Page from '../../components/Page';

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
  return (
    <Page title="Dashboard | Virtual Market">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <RootStyle variant="outlined">
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
            <RootStyle variant="outlined">
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
            <RootStyle variant="outlined">
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
      </Container>
    </Page>
  );
}
