import classNames from 'classnames/bind';
// import Header from '../components/Header';
import Header from '~/layouts/components/Header';
import styles from './DefaultLayout.module.scss'
import Sidebar from './Sidebar';

const cx = classNames.bind(styles)

// chứa all layout hiện tại
// content động truyền từ ngoài vào -> children
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
