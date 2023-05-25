//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';
// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  return (
    <MAvatar src="/static/mock-images/avatars/avatar_default.jpg" alt="avatar" color="default" {...other}>
      {createAvatar('tehnik').name}
    </MAvatar>
  );
}
