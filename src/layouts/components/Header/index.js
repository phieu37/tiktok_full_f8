// import { useEffect, useState } from 'react';
// bind giúp viết className dạng: .post-item
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    // faCircleXmark,
    // faCloudUpload,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    // faMagnifyingGlass,
    faUser,
    // faMessage,
    // faSignIn,
    // faSpinner,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
// import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import config from '~/config';
import Button from '~/components/Button';
// import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
// import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import {
    InboxIcon,
    MessageIcon,
    // SearchIcon,
    UploadIcon,
} from '~/components/icons';
import Image from '~/components/Image';
import Search from '../Search';

const cx = classNames.bind(styles);
// console.log(images.logo); // default: "/static/media/logo.a6485b602042e794da9eb0c0d4f7c77c.svg"

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        // quy ước có children hiểu là sub cấp 2, data sẽ chứa item con
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                    // children: {
                    //     title: 'Language',
                    //     data: [
                    //         {
                    //             type: 'language',
                    //             code: 'vi',
                    //             title: 'Tiếng Việt tập 1',
                    //         },
                    //         {
                    //             type: 'language',
                    //             code: 'vi',
                    //             title: 'Tiếng Việt tập 2',
                    //         },
                    //     ],
                    // },
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and Help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    // const [searchResult, setSearchResult] = useState([]);

    // VD: có user đăng nhập
    const currentUser = true;
    // const currentUser = false;

    // API
    // useEffect(() => {
    //     setTimeout(() => {
    //         setSearchResult([1, 2, 3]);
    //         // setSearchResult([]);
    //     }, 0);
    // }, []);

    // Handle logic
    const handleMenuChange = (menuItem) => {
        // console.log(menuItem);
        switch (menuItem.type) {
            case 'Language':
                // Handle change language
                break;
            default:
                break;
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View propffile',
            to: '/@hoa',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true, // Custom thêm class separate để tạo gạch ngang
        },
    ];

    // Thẻ cha thì cứ đặt là wrapper
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* logo */}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>

                {/* Search */}
                <Search />

                {/* login/upload có user và ko có user sẽ có nút khác nhau*/}
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            {/* // trigger='click' // click để tắt bật */}
                            <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    {/* <FontAwesomeIcon icon={faCloudUpload} /> */}
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            {/* to='/login' sang link nội bộ sử dụng react-router-dom link ngoài ko được pải dùng href */}
                            {/* <Button primary to="/login" onClick={() => alert('Clicked!')}> */}
                            {/* <Button primary href='https://fullstack.edu.vn/' target='_blank'> */}
                            {/* <Button outline small> */}
                            {/* <Button outline large> */}
                            <Button text>Upload</Button>
                            {/* <Button primary disabled onClick={() => alert('Clicked!')} onMouseUp={() => {}}> */}
                            {/* <Button primary rounded> */}
                            {/* <Button rounded className={cx('custom-login')}> */}
                            {/* <Button primary leftIcon={<FontAwesomeIcon icon={faSignIn} />}> */}
                            <Button primary>Log in</Button>
                            {/* <Button primary>Log in</Button> */}
                        </>
                    )}

                    {/* nút 3 chấm khi chưa đăng nhập, avatar khi đã đăng nhập*/}
                    <Menu
                        // Nếu có currentUser thì dùng userMenu ngược lại dùng MENU_ITEMS
                        items={currentUser ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                    >
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https:://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/c9f14092fbcdc46eb2eaaae3cdaf5302.jpeg?lk3s=a5d48078&x-expires=1709956800&x-signature=HZc7Qdq%2BPOobrQGql5Hl%2BcL9aIc%3D"
                                alt="Phieu"
                                fallback="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
