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
// components
import Page from '../../components/Page';
import { Offerslip, TemporaryConfirmation, FinalConfirmation, FinalSecurity } from '../../components/_dashboard/detail';

// ----------------------------------------------------------------------

export default function DetailPage() {
  const [currentTab, setCurrentTab] = useState('offerslip');
  const [riskDetail, setRiskDetail] = useState([]);
  const [rate, setRate] = useState([]);
  const [sumInsured, setSumInsured] = useState([]);
  const [premi, setPremi] = useState([]);

  const { detailId } = useParams();

  useEffect(() => {
    axios
      .get(`https://vm-service.tib.co.id/api/v1/getDetail?id=${detailId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then((response) => {
        setRiskDetail(response.data.detail_os.risk_detail[0]);
        setRate(response.data.detail_os.rate[0]);
        setSumInsured(response.data.detail_os.sum_insured);
        setPremi(response.data.detail_os.premi);
      });
  }, [detailId]);

  const ACCOUNT_TABS = [
    {
      value: 'offerslip',
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <Offerslip rd={riskDetail} rate={rate} si={sumInsured} premi={premi} />
    },
    {
      value: 'temporary_confirmation',
      icon: <Icon icon={roundTimer} width={20} height={20} />,
      component: <TemporaryConfirmation />
    },
    {
      value: 'final_confirmation',
      icon: <Icon icon={roundCheckCircle} width={20} height={20} />,
      component: <FinalConfirmation />
    },
    {
      value: 'final_security',
      icon: <Icon icon={roundSecurity} width={20} height={20} />,
      component: <FinalSecurity />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="Detail | Virtual Market">
      <Container maxWidth="xl">
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
