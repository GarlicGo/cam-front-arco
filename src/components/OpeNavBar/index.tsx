import React, { useContext, useEffect } from 'react';
import {
  Tooltip,
  Input,
  Avatar,
  Select,
  Dropdown,
  Menu,
  Divider,
  Message,
  Button,
} from '@arco-design/web-react';
import {
  IconLanguage,
  IconRotateRight,
  IconSunFill,
  IconMoonFill,
  IconUser,
  IconSettings,
  IconPoweroff,
  IconExperiment,
  IconDashboard,
  IconInteraction,
  IconTag,
} from '@arco-design/web-react/icon';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '@/store';
import { GlobalContext } from '@/context';
import useLocale from '@/utils/useLocale';
import Logo from '@/assets/logo.svg';
import MessageBox from '@/components/MessageBox';
import IconButton from './IconButton';
import Settings from '../Settings';
import styles from './style/index.module.less';
import defaultLocale from '@/locale';
import useStorage from '@/utils/useStorage';
import { generatePermission } from '@/routes';

function OpeNavbar({ show }: { show: boolean }) {
  const t = useLocale();
  const userInfo = useSelector((state: GlobalState) => state.userInfo);
  const dispatch = useDispatch();

  const [_, setUserStatus] = useStorage('userStatus');
  const [role, setRole] = useStorage('userRole', 'admin');

  const { setLang, lang, theme, setTheme } = useContext(GlobalContext);

  function logout() {
    setUserStatus('logout');
    window.location.href = '/login';
  }

  function onMenuItemClick(key) {
    if (key === 'logout') {
      logout();
    } else {
      Message.info(`You clicked ${key}`);
    }
  }

  useEffect(() => {
    dispatch({
      type: 'update-userInfo',
      payload: {
        userInfo: {
          ...userInfo,
          permissions: generatePermission(role),
        },
      },
    });
  }, [role]);

  if (!show) {
    return (
      <div className={styles['fixed-settings']}>
        <Settings
          trigger={
            <Button icon={<IconSettings />} type="primary" size="large" />
          }
        />
      </div>
    );
  }

  const handleChangeRole = () => {
    const newRole = role === 'admin' ? 'user' : 'admin';
    setRole(newRole);
  };

  const droplist = (
    <Menu onClickMenuItem={onMenuItemClick}>
      <Menu.SubMenu
        key="role"
        title={
          <>
            <IconUser className={styles['dropdown-icon']} />
            <span className={styles['user-role']}>
              {role === 'admin'
                ? t['menu.user.role.admin']
                : t['menu.user.role.user']}
            </span>
          </>
        }
      >
        <Menu.Item onClick={handleChangeRole} key="switch role">
          <IconTag className={styles['dropdown-icon']} />
          {t['menu.user.switchRoles']}
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="setting">
        <IconSettings className={styles['dropdown-icon']} />
        {t['menu.user.setting']}
      </Menu.Item>
      <Menu.SubMenu
        key="more"
        title={
          <div style={{ width: 80 }}>
            <IconExperiment className={styles['dropdown-icon']} />
            {t['message.seeMore']}
          </div>
        }
      >
        <Menu.Item key="workplace">
          <IconDashboard className={styles['dropdown-icon']} />
          {t['menu.dashboard.workplace']}
        </Menu.Item>
      </Menu.SubMenu>

      <Divider style={{ margin: '4px 0' }} />
      <Menu.Item key="logout">
        <IconPoweroff className={styles['dropdown-icon']} />
        {t['navbar.logout']}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      <ul className={styles.right}>
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
        <IconButton icon={<IconRotateRight />} />
      </ul>
    </div>
  );
}

export default OpeNavbar;
