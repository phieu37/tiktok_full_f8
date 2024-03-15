import PropTypes from 'prop-types'; // để validate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

// test img lỗi là cái ::
// to={`/@${data.nickname}`} để vào trang profile(muốn có @ trước name thì để ko thì bỏ)
function AccountItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image
                className={cx('avatar')}
                // src="https:://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7342740037598019589~c5_720x720.jpeg?lk3s=a5d48078&x-expires=1709787600&x-signature=64O7%2Fr9XbKRsFChrU8d3X8%2FMssc%3D"
                // alt="Hoa"
                src={data.avatar}
                alt={data.full_name}
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    {/* <span>PhieuPhieu</span> */}
                    <span>{data.full_name}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                {/* <span className={cx('username')}>Phieu</span> */}
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

// validate
AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
