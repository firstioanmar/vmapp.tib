/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
// material
import {
  Grid,
  Card,
  CardHeader,
  IconButton,
  Collapse,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import MaterialReactTable from 'material-react-table';

const columns = [
  {
    accessorKey: 'type',
    header: 'Type'
  },
  {
    accessorKey: 'curr',
    header: 'Currency'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  }
];

const columnsRate = [
  {
    accessorKey: 'flexas_rate',
    header: 'Flexas Rate'
  },
  {
    accessorKey: 'rsmd_rate',
    header: 'RSMD Rate'
  },
  {
    accessorKey: 'cc_rate',
    header: 'CC Rate'
  },
  {
    accessorKey: 'tsfwd_rate',
    header: 'TSFWD Rate'
  },
  {
    accessorKey: 'others_rate',
    header: 'Others Rate'
  },
  {
    accessorKey: 'par_rate',
    header: 'PAR Rate'
  },
  {
    accessorKey: 'eq_rate',
    header: 'EQ Rate'
  }
];

export default function Offerslip({ data, sumInsured, tsi, rate }) {
  const [expandRiskDetail, setExpandRiskDetail] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ py: 5, px: 3, mb: 1, textAlign: 'center' }} variant="outlined">
          <Typography variant="h3" style={{ textTransform: 'uppercase', marginBottom: 0 }} paragraph>
            Offer slip
          </Typography>
          <Typography variant="h3" style={{ textTransform: 'uppercase', marginBottom: 0 }} paragraph>
            {data.sppaNo}
          </Typography>
        </Card>

        <Card sx={{ py: 3, px: 3, mb: 1, textAlign: 'center' }} variant="outlined">
          <CardHeader
            action={
              <IconButton onClick={() => setExpandRiskDetail(!expandRiskDetail)}>
                <Icon
                  icon={expandRiskDetail ? 'material-symbols:expand-less' : 'material-symbols:expand-more'}
                  fontSize={30}
                />
              </IconButton>
            }
            titleTypographyProps={{ variant: 'h3' }}
            title="Risk Detail"
            sx={{ mb: 2 }}
          />
          <Collapse in={expandRiskDetail}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Type Of Cover"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {data.typeCover}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Insured Name"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {data.insured}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Name In The Policy"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {data.polis_name}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Insured Address"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {data.address}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Occupation Description"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {data.occupation}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Risk Location"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {data.riskLocation}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Period"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {data.period}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Insured Of Interest"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          <div dangerouslySetInnerHTML={{ __html: data.interestInsured }} />
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Collapse>
        </Card>
        <Card sx={{ py: 3, px: 3, mb: 1, textAlign: 'center' }} variant="outlined">
          <CardHeader titleTypographyProps={{ variant: 'h3' }} title="Sum Insured" sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <MaterialReactTable
                columns={columns}
                state={{ showSkeletons: showSkeleton }}
                data={sumInsured}
                enableColumnActions={false}
                enableColumnFilters={false}
                enablePagination={false}
                enableSorting={false}
                enableBottomToolbar={false}
                enableTopToolbar={false}
                initialState={{ density: 'compact' }}
              />
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ py: 3, px: 3, mb: 1, textAlign: 'center' }} variant="outlined">
          <CardHeader titleTypographyProps={{ variant: 'h3' }} title="Sum Insured" sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Tsi"
                    secondary={tsi.map((tsi, index) => (
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        key={index}
                      >
                        {tsi.curr} - {tsi.amount}
                      </Typography>
                    ))}
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Risk Of Covered"
                    secondary={
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        <div dangerouslySetInnerHTML={{ __html: data.riskCovered }} />
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Extension Of Covered"
                    secondary={
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        <div dangerouslySetInnerHTML={{ __html: data.extentionCover }} />
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Deductible"
                    secondary={
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        <div dangerouslySetInnerHTML={{ __html: data.deductible }} style={{ marginLeft: '30px' }} />
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Extension Clauses"
                    secondary={
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        <div
                          dangerouslySetInnerHTML={{ __html: data.extentionClauses }}
                          style={{ marginLeft: '30px' }}
                        />
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ py: 3, px: 3, mb: 1, textAlign: 'center' }} variant="outlined">
          <CardHeader titleTypographyProps={{ variant: 'h3' }} title="Rate" sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <MaterialReactTable
                columns={columnsRate}
                state={{ showSkeletons: showSkeleton }}
                data={rate}
                enableColumnActions={false}
                enableColumnFilters={false}
                enablePagination={false}
                enableSorting={false}
                enableBottomToolbar={false}
                enableTopToolbar={false}
                initialState={{ density: 'compact' }}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
