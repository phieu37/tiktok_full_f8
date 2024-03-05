import { useEffect, useState } from 'react';
// bind giúp viết className dạng: .post-item
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSignIn, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);
// console.log(images.logo); // default: "/static/media/logo.a6485b602042e794da9eb0c0d4f7c77c.svg"

function Header() {
    const [searchResult, setSearchResult] = useState([]);
    // API
    useEffect(() => {
        setTimeout(() => {
            // setSearchResult([1, 2, 3]);
            setSearchResult([]);
        }, 0);
    }, []);

    // Thẻ cha thì cứ đặt là wrapper
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt="Tiktok" />

                <Tippy
                    interactive
                    visible={searchResult.length > 0} // KQ tìm kiếm > 0 thì hiện
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>

                <div className={cx('actions')}>
                    {/* to='/login' sang link nội bộ sử dụng react-router-dom 
                    link ngoài ko được pải dùng href */}
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
                </div>
            </div>
        </header>
    );
}

export default Header;
