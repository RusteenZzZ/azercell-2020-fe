import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { ROUTES } from '../../routes';

export const PrivateNavbar: React.FC = () => {
  const { logout } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  return (
    <div className="fixed top-0 w-full px-4 py-4 bg-white md:px-12">
      <div className="flex items-center justify-between">
        <Link to={ROUTES.home} className="flex">
          <h1 className="text-3xl font-bold">Examut</h1>
          <span className="text-7xl text-primary leading-[5px]">.</span>
        </Link>
        <div className="flex items-center text-lg font-bold space-x-4">
          <Link to={ROUTES.dashboard}>Dashboard</Link>
          <div
            className="cursor-pointer"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <AccountCircleOutlinedIcon fontSize="large" />
          </div>
          <Menu
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={() => setAnchorEl(null)}
            getContentAnchorEl={null}
            keepMounted
          >
            <MenuItem>
              <Link to={ROUTES.profile}>Profile</Link>
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};
