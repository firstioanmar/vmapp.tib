import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';
import ImageLogo from '../assets/tib_logo_outline.png';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <Box sx={{ width: 100, height: 40, ...sx }}>
      <img src={ImageLogo} alt="logo" />
    </Box>
  );
}
