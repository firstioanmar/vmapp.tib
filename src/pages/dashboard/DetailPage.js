import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundTimer from '@iconify/icons-ic/round-timer';
import roundCheckCircle from '@iconify/icons-ic/round-check-circle';
import roundSecurity from '@iconify/icons-ic/round-security';
import axios from 'axios';

// material
import { Container, Tab, Box, Tabs, Stack } from '@material-ui/core';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { AccountGeneral, AccountChangePassword } from '../../components/_dashboard/user/account';
import { Offerslip } from '../../components/_dashboard/detail';

// ----------------------------------------------------------------------

export default function DetailPage() {
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('offerslip');
  const [riskDetail, setRiskDetail] = useState([]);
  const [rate, setRate] = useState([]);
  const [sumInsured, setSumInsured] = useState([]);

  const { detailId } = useParams();

  useEffect(() => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    axios.get(`https://vm-service.tib.co.id/api/v1/getDetail?id=${detailId}`).then((response) => {
      setRiskDetail(response.data.detail_os.risk_detail[0]);
      setRate(response.data.detail_os.rate[0]);
      setSumInsured(response.data.detail_os.sum_insured);
    });
  }, [detailId]);

  const ACCOUNT_TABS = [
    {
      value: 'offerslip',
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <Offerslip rd={riskDetail} rate={rate} si={sumInsured} />
    },
    {
      value: 'temporary_confirmation',
      icon: <Icon icon={roundTimer} width={20} height={20} />,
      component: <AccountGeneral />
    },
    {
      value: 'final_confirmation',
      icon: <Icon icon={roundCheckCircle} width={20} height={20} />,
      component: <AccountChangePassword />
    },
    {
      value: 'final_security',
      icon: <Icon icon={roundSecurity} width={20} height={20} />,
      component: <AccountChangePassword />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="Detail | Virtual Market">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>
      </Container>
    </Page>
  );
}
