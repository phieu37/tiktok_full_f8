import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    // Ban đầu sẽ render ra items -> truyền obj {} : đại diện cho trang hiện tại tương tự obj children
    const [history, setHistory] = useState([{ data: items }]);

    // Hiện tại lấy ra trang 1 luôn là phần tử cuối mảng
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            // k.tra xem thằng nào có con dùng !! để chuyển thành boolean
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            // Nếu có isParent thì push cái mói vào mảng cấp 2 3 ...  Ngược lại trả ra item được click vào
                            // console.log(item.children);
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    }

    const renderResult = (attrs) => (
        // tabIndex="-1" để ko bị focus vào khi ấn dấu Tab
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {/* Nếu > 1 tức là trang 2,3... trả ra trang đó */}
                {/* onBack xóa p/tử cuối để lùi về 1 cấp -> cắt từ ơ/tử 0 đếm gầm cuối */}
                {history.length > 1 && (
                    <Header
                        title={current.title}
                        onBack={handleBack}
                    />
                )}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    // reset to first page, lấy từ 0 đến 1
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            // visible
            interactive
            delay={[0, 700]}
            offset={[12, 8]} // custom chiều ngang = 12px, cao = 8px
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={renderResult}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

// validate
Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
