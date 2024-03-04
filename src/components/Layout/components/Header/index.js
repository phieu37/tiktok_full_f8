// bind giúp viết className dạng: .post-item
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    // Thẻ cha thì cứ wrapper
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* logo */}
                {/* search */}
            </div>
        </header>
    );
}

export default Header;
