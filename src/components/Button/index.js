import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

// ...passProps là những props mà pass thêm vào VD: target='_blank'
function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    disabled = false,
    rounded = false,
    small = false,
    large = false,
    children,
    className, // thêm className để custom
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    // props nội bộ
    const props = {
        onClick,
        ...passProps,
    };

    // Remove event listener khi btn disabled (bỏ tích pointer-events: none;)
    if (disabled) {
        // C1: delete props.onClick;
        // C2:
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    // thay đổi thẻ button sang a ngược lại
    if (to) {
        // link nội bộ
        props.to = to;
        Comp = Link;
    } else if (href) {
        // link ra ngoài
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        // khi có className bên pải sẽ lấy g/trị làm key bên trái [className]
        [className]: className,
        primary,
        outline,
        text,
        disabled,
        rounded,
        small,
        large,
    });

    // thêm thẻ span để sau thêm icon cho dễ xử lỹ
    // Nếu có leftIcon thì thêm thẻ span
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
