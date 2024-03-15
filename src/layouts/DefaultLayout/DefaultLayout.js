import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
// import Header from '../components/Header';
import Header from '~/layouts/components/Header/Header';
import styles from './DefaultLayout.module.scss';
import Sidebar from './Sidebar/Sidebar';

const cx = classNames.bind(styles);

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

// validate
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
