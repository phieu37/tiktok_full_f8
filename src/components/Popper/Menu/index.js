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
                            // Nếu có isParent thì push cái mói vào mảng ấp 2 3 ...
                            // Ngược lại trả ra item được click vào
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

    return (
        <Tippy
            // visible
            interactive
            delay={[0, 700]}
            offset={[12, 8]} // custom chiều ngang = 12px, cao = 8px
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {/* Nếu > 1 tức là trang 2,3... trả ra trang đó */}
                        {/* onBack xóa p/tử cuối để lùi về 1 cấp -> cắt từ ơ/tử 0 đếm gầm cuối */}
                        {history.length > 1 && (
                            <Header
                                title="Language"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            // set về p/tử đầu tiên, lấy từ 0 đến 1
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
