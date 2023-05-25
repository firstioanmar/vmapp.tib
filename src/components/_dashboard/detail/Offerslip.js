/* eslint-disable react/prop-types */
import { useState } from 'react';
import { capitalCase } from 'change-case';
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
  ListItemText,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Box,
  Stack
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import moment from 'moment-timezone';
import useSettings from '../../../hooks/useSettings';
import { AccountGeneral, AccountChangePassword } from '../user/account';

export default function Offerslip({ rd, rate, si }) {
  const { themeMode } = useSettings();
  const [currentTab, setCurrentTab] = useState('premi_total');
  const [expandRiskDetail, setExpandRiskDetail] = useState(true);
  const [expandRate, setExpandRate] = useState(true);

  const PREMI_TABS = [
    {
      value: 'premi_total',
      icon: <Icon icon="material-symbols:border-all" width={20} height={20} />,
      component: <AccountChangePassword />
    },
    {
      value: 'premi_detail',
      icon: <Icon icon="material-symbols:read-more" width={20} height={20} />,
      component: <AccountGeneral />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ py: 5, px: 3, mb: 1, textAlign: 'center' }}>
          <Typography variant="h3" style={{ textTransform: 'uppercase', marginBottom: 0 }} paragraph>
            Offer slip
          </Typography>
          <Typography variant="h3" style={{ textTransform: 'uppercase', marginBottom: 0 }} paragraph>
            {rd.slip_no}
          </Typography>
        </Card>

        <Card sx={{ py: 3, px: 3, mb: 1, textAlign: 'center' }}>
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
              <Grid item xs={12} sm={6} md={6}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Type Of Cover"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {rd.cob_desc}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Insured Name"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {rd.insd_name}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Name In The Policy"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {rd.polis_name}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Insured Address"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {rd.consignee_address}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Occupation Code"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {rd.ocp_name}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Occupation Description"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {rd.occupation}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Period"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {moment(rd.start_date).format('DD-MM-YYYY')} to {moment(rd.end_date).format('DD-MM-YYYY')}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Insured Of Interest"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {rd.interest_insured}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Risk Location"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {rd.risk_location}
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Scope Of Cover"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {rd.scope_cover}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="SUM Insured"
                      secondary={si.map((sumInsured) => (
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          key={sumInsured.id}
                        >
                          {sumInsured.type} {sumInsured.curr_code} {sumInsured.amount} <b>ket:</b>{' '}
                          {sumInsured.descriptions}
                          <br />
                        </Typography>
                      ))}
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Total SUM Insured"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {rd.cob_desc}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Notes"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {rd.notes}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Claim Experience & Premium Performance"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {rd.notes}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Class Of Risk"
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {rd.notes}
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Collapse>
        </Card>

        <Card sx={{ py: 3, px: 3, textAlign: 'center' }}>
          <CardHeader
            action={
              <IconButton onClick={() => setExpandRate(!expandRate)}>
                <Icon
                  icon={expandRate ? 'material-symbols:expand-less' : 'material-symbols:expand-more'}
                  fontSize={30}
                />
              </IconButton>
            }
            titleTypographyProps={{ variant: 'h3' }}
            title="Rate"
            sx={{ mb: 2 }}
          />
          <Collapse in={expandRate}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <Table>
                  <TableBody>
                    {rate.flexas_rate != null ? (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          FLEXAS
                        </TableCell>
                        <TableCell align="right">{rate.flexas_rate} %</TableCell>
                      </TableRow>
                    ) : (
                      false
                    )}
                    {rate.flag_rsmd === 0 ? (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          RSMDCC
                        </TableCell>
                        <TableCell align="right">{rate.rsmd_rate - rate.cc_rate} %</TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          RSMD
                        </TableCell>
                        <TableCell align="right">{rate.rsmd_rate} %</TableCell>
                      </TableRow>
                    )}
                    {rate.tsfwd_rate != null ? (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          TSFWD
                        </TableCell>
                        <TableCell align="right">{rate.tsfwd_rate} %</TableCell>
                      </TableRow>
                    ) : (
                      false
                    )}
                    {rate.others_rate != null ? (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          OTHERS
                        </TableCell>
                        <TableCell align="right">{rate.others_rate} %</TableCell>
                      </TableRow>
                    ) : (
                      false
                    )}
                    <TableRow
                      style={{
                        backgroundColor: themeMode === 'dark' ? '#005249' : '#C8FACD'
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Total
                      </TableCell>
                      <TableCell align="right">{rate.flexas_rate} %</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        FLEXAS
                      </TableCell>
                      <TableCell align="right">{rate.flexas_rate} %</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        RSMDCC
                      </TableCell>
                      <TableCell align="right">{rate.rsmd_rate} %</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        CC
                      </TableCell>
                      <TableCell align="right">{rate.flexas_rate} %</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        TSFWD
                      </TableCell>
                      <TableCell align="right">{rate.flexas_rate} %</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        OTHERS
                      </TableCell>
                      <TableCell align="right">{rate.flexas_rate} %</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Collapse>
        </Card>

        <Stack spacing={5} sx={{ mt: 2 }}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {PREMI_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>

          {PREMI_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>
      </Grid>
    </Grid>
  );
}
