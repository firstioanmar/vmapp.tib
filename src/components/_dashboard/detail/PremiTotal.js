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

export default function PremiTotal() {
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
        <Card sx={{ py: 3, px: 3, textAlign: 'center' }}>
          <CardHeader
            action={
              <IconButton onClick={() => setExpandRate(!expandRate)}>
                <IconButton
                  icon={expandRiskDetail ? 'material-symbols:expand-less' : 'material-symbols:expand-more'}
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
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      FLEXAS
                    </TableCell>
                    <TableCell align="right"> %</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Collapse>
        </Card>
      </Grid>
    </Grid>
  );
}
