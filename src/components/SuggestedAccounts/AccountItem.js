import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('account-item')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/8ff3a6c65f346666f79c7b10cae2454d.webp?lk3s=a5d48078&x-expires=1710738000&x-signature=9P6h1Nu7wIfXUXRPDqxmZvsUQiQ%3D"
                alt=""
            />
            <div className={cx('item-info')}>
                <p className={cx('nickname')}>
                    <strong>huehaycuoi</strong>
                    <FontAwesomeIcon className={cx('chack')} icon={faCheckCircle}/>
                </p>
                <p className={cx('name')}>Huệ</p>
            </div>
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
