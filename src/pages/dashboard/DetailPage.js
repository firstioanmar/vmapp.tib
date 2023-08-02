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
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import { Offerslip, TemporaryConfirmation, FinalConfirmation, FinalSecurity } from '../../components/_dashboard/detail';

// ----------------------------------------------------------------------

export default function DetailPage() {
  const [currentTab, setCurrentTab] = useState('offerslip');
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [sumInsured, setSumInsured] = useState([]);
  const [tsi, setTsi] = useState([]);
  const [temporaryIns, setTemporaryIns] = useState([]);
  const [finalInsConf, setFinalInsConf] = useState([]);
  const [finalSecurity, setFinalSecurity] = useState([]);
  const [rate, setRate] = useState([]);

  const { reqIdReff } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detail = await axios.get('https://vm-service.tib.co.id/api/placing/detail-data', {
          params: { reqId_reff: reqIdReff },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.access_token}`
          }
        });

        const dataDetail = await detail.data;
        if (dataDetail.status === 200) {
          setData(dataDetail.data);
          setSumInsured(dataDetail.data.sumInsured);
          setTsi(dataDetail.data.tsi);
          setTemporaryIns(dataDetail.data.temporaryIns);
          setFinalInsConf(dataDetail.data.finalInsConf);
          setFinalSecurity(dataDetail.data.finalSecurity);
          setRate(dataDetail.data.rate);
        }
      } catch (error) {
        // Check for token expired error (example: HTTP 401 Unauthorized)
        console.log(error);
      }
    };
    fetchData();
  }, [user, reqIdReff]);

  const ACCOUNT_TABS = [
    {
      value: 'offerslip',
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <Offerslip data={data} sumInsured={sumInsured} tsi={tsi} rate={rate} />
    },
    {
      value: 'temporary_confirmation',
      icon: <Icon icon={roundTimer} width={20} height={20} />,
      component: <TemporaryConfirmation temporaryIns={temporaryIns} />
    },
    {
      value: 'final_confirmation',
      icon: <Icon icon={roundCheckCircle} width={20} height={20} />,
      component: <FinalConfirmation finalInsConf={finalInsConf} />
    },
    {
      value: 'final_security',
      icon: <Icon icon={roundSecurity} width={20} height={20} />,
      component: <FinalSecurity finalSecurity={finalSecurity} />
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
