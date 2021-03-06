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
  Typography,
  Space,
} from '@arco-design/web-react';
import {
  IconLanguage,
  IconNotification,
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

function Navbar({ show }: { show: boolean }) {
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

  const positions = ['bl', 'bottom', 'br', 'tl', 'top', 'tr'];
  const descriptions = ['??????', 'CAD', '??????', '??????', '??????'];

  return (
    <div className={styles.navbar}>
      {/* <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles['logo-name']}>CAM ????????????</div>
        </div>
      </div> */}
      <div className="dropdown-demo">
        {descriptions.map((value, index) => (
          <Dropdown
            key={index}
            // position={position}
            droplist={
              <Menu>
                <Menu.Item key="1">Menu Item 1</Menu.Item>
                <Menu.Item key="2">Menu Item 2</Menu.Item>
                <Menu.Item key="3">Menu Item 3</Menu.Item>
              </Menu>
            }
          >
            <Button type="text">
              <Typography.Paragraph style={{ margin: 0, cursor: 'pointer' }}>
                {value}
              </Typography.Paragraph>
            </Button>
          </Dropdown>
        ))}
      </div>
      {/* <ul className={styles.right}>
        <li>
          <Select
            triggerElement={
              <Typography.Paragraph
                style={{ width: "100%", margin: 0, cursor: 'pointer' }}
              >
                ??????
              </Typography.Paragraph>
            }
            options={['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']}
            // dropdownMenuStyle={{
            //   width: '20px',
            // }}
            value={''}
            trigger="click"
            onChange={(value) => {
              console.log('value->', value);
            }}
          />
        </li>
      </ul> */}
      {/* <ul className={styles.right}>
        {userInfo && (
          <Dropdown droplist={droplist} position="br">
            <Avatar size={32} style={{ cursor: 'pointer' }}>
              <img alt="avatar" src={userInfo.avatar} />
            </Avatar>
          </Dropdown>
        )}
      </ul> */}
    </div>
  );
}

export default Navbar;
