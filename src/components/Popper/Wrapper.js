import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

//  Nhận thêm 1 className qua props truyền xuống để custom riêng styles
function Wrapper({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

// validate
Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Wrapper;
