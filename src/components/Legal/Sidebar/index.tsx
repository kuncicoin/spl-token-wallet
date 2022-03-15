import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const menus = [
  {
    url: '/privacy-policy',
    label: 'Privacy Policy',
  },
  {
    url: '/terms-n-condition',
    label: 'Terms & Condition',
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <section className={styles.sidebar}>
      <section>
        {menus.map((item) => (
          <Link
            key={item.url}
            style={
              pathname === item.url ? { color: '#A692ED', fontWeight: 600 } : {}
            }
            to={item.url}
          >
            {item.label}
          </Link>
        ))}
      </section>
    </section>
  );
};

export default Sidebar;
