import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../configs/routes';
import { IUserInfo } from '../../../../models/user';
import Button from '../../../common/components/button/Button';
import Checkbox from '../../../common/components/input/Checkbox';
import { storeScrollPosition } from '../../../common/redux/commonReducer';

interface Props {
  user: IUserInfo;
  selected: boolean;
  onSelect(userId: IUserInfo['profile_id']): void;
}

const UserRowComponent = (props: Props) => {
  const dispatch = useDispatch();
  const { user, selected, onSelect } = props;
  const userCreated =
    user.created !== '0' ? moment(parseInt(user.created) * 1000).format('MMM D YYYY, h:mm A') : 'Never';
  const userLastLogin =
    user.last_login !== '0' ? moment(parseInt(user.last_login) * 1000).format('MMM D YYYY, h:mm A') : 'Never';
  const name = `${user.fistName ? user.fistName : ''} ${user.lastName ? user.lastName : ''}`;

  const handleRestroScroll = () => {
    dispatch(
      storeScrollPosition({
        page: ROUTES.listUsers,
        scroll: document.getElementById('scrollable-container')?.scrollTop || 0,
      }),
    );
  };
  return (
    <tr className={`${selected && 'opacity-70'}`}>
      <td className="x truncate p-3 ">
        <div className="border-r border-dashed py-2">
          <Checkbox value={selected} onChange={() => onSelect(user.profile_id)} />
        </div>
      </td>
      <td className="truncate p-3 text-left">
        <div>
          <Link
            onClick={handleRestroScroll}
            className="text-sky-500 hover:underline"
            to={ROUTES.detailUser + '/' + user.profile_id}
          >
            {user.vendor}
          </Link>
        </div>
        <div>{user.storeName}</div>
      </td>
      <td className="truncate p-3 text-left ">
        <Link
          onClick={handleRestroScroll}
          className="text-sky-500 hover:underline"
          to={ROUTES.detailUser + '/' + user.profile_id}
        >
          {name}
        </Link>
      </td>
      <td className="truncate p-3 text-left">{user.access_level}</td>
      <td className="truncate p-3 text-left">{user.product}</td>
      <td className="truncate p-3 text-left">{user.order.order_as_buyer}</td>
      <td className="truncate p-3 text-left">{user.wishlist}</td>
      <td className="truncate p-3 text-left">{userCreated}</td>
      <td className="truncate p-3 text-left">{userLastLogin}</td>
      <td className="p-3">
        <div className="border-l border-dashed pl-4">
          <Button variant="purple" onClick={() => onSelect(user.profile_id)}>
            <i className="fa-solid fa-trash"></i>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(UserRowComponent);
