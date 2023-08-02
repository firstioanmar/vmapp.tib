import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, Divider, Stack, Typography } from '@mui/material';

// material
import Chip from '@mui/material/Chip';
import { Grid, Container, TextField, InputAdornment, Button } from '@material-ui/core';
import axios from 'axios';
import { InfoOutlined, PersonSharp, Search, Business } from '@mui/icons-material';
import { MAvatar } from '../../components/@material-extend';
import createAvatar from '../../utils/createAvatar';
import useAuth from '../../hooks/useAuth';

// components
import Page from '../../components/Page';

export default function Offerslip() {
  const { user } = useAuth();
  const [lists, setList] = useState([]);
  const itemsPerPage = 6;
  const [filterTerm, setFilterTerm] = useState('');
  const [visibleItemCount, setVisibleItemCount] = useState(itemsPerPage);

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
    setVisibleItemCount(itemsPerPage);
  };

  const filteredData = lists.filter((item) => item.slip_no.toLowerCase().includes(filterTerm.toLowerCase()));

  const handleSeeMore = () => {
    setVisibleItemCount((prevCount) => prevCount + itemsPerPage);
  };

  const showSeeMoreButton = visibleItemCount < filteredData.length;

  console.log = filteredData;

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

        const lists = await listData.data;
        if (lists.status === 200) {
          setList(lists.message);
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
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Card variant="outlined">
              <Stack spacing={2} sx={{ position: 'relative', p: 1.5 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <TextField
                    fullWidth
                    label="Search by Slip number"
                    variant="outlined"
                    value={filterTerm}
                    onChange={handleFilterChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Search />
                        </InputAdornment>
                      )
                    }}
                  />
                </Stack>
              </Stack>
            </Card>
            {filteredData.length === 0 ? (
              <Card
                variant="outlined"
                sx={{
                  my: 2
                }}
              >
                <Stack spacing={2} sx={{ position: 'relative', p: 1.5 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
                      <i>No matching results found.</i>
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            ) : (
              filteredData.slice(0, visibleItemCount).map((list, index) => (
                <Link to={`/offerslip/detail/${list.req_id_reff}`} key={index} style={{ textDecoration: 'none' }}>
                  <Card
                    variant="outlined"
                    sx={{
                      my: 2,
                      ':hover': { border: '1px solid #00AB55' },
                      ':active': { border: '1px solid #00AB55' }
                    }}
                  >
                    <Stack spacing={2} sx={{ position: 'relative', p: 1.5 }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <div style={{ flex: 'none' }}>
                          <MAvatar color={createAvatar(list.cob_code).color} sx={{ width: '64px', height: '64px' }}>
                            {list.cob_code}
                          </MAvatar>
                        </div>
                        <div style={{ flex: '1 1 0%' }}>
                          <Typography variant="h6" sx={{ wordBreak: 'break-all' }}>
                            {list.slip_no}
                          </Typography>
                          <Chip label={list.prospek_insd} icon={<Business />} variant="outlined" sx={{ border: 0 }} />
                          <Chip
                            label={list.created_by}
                            icon={<PersonSharp />}
                            variant="outlined"
                            sx={{ display: { sm: 'none' }, my: 1 }}
                          />
                        </div>
                        <Chip
                          label={list.created_by}
                          icon={<PersonSharp />}
                          variant="outlined"
                          sx={{ display: { xs: 'none', sm: 'flex' } }}
                        />
                      </Stack>

                      <Divider />
                      <CardActions>
                        <Typography level="title-lg" sx={{ mr: 'auto' }}>
                          {list.request_status}
                        </Typography>
                        <Button variant="outlined" startIcon={<InfoOutlined />}>
                          View
                        </Button>
                      </CardActions>
                    </Stack>
                  </Card>
                </Link>
              ))
            )}
            {showSeeMoreButton && <Button onClick={handleSeeMore}>See More</Button>}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
