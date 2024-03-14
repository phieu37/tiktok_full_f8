import { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import * as searchServices from '~/apiServices/searchServices';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/icons';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    // truyền value muốn delay và truyền thời gian muốn delay theo hooks vừa custom
    // user ngừng gõ 500ms mới bắn api
    // 1. '' -> 2. 'h' -> 3. 'ho' -> 4. 'hoa'
    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    // Api fake để test
    // useEffect(() => {
    //     setTimeout(() => {
    //         setSearchResult([1, 2, 3]);
    //         // setSearchResult([]);
    //     }, 0);
    // }, []);

    // Api thật
    useEffect(() => {
        // Ko có searchValue thì return để thoát hàm, trim fix bug dấu cách
        // .trimStart() chỗ input giống tiktok
        // if (!searchValue.trim()) {
        if (!debounced) {
            setSearchResult([]);
            return;
        }

        // setLoading(true);
        // const fetchApi = async () => {
        //     try {
        //         const res = await request.get('users/search', {
        //             params: {
        //                 q: debounced,
        //                 type: 'less',
        //             },
        //         });
        //         setSearchResult(res.data);
        //         setLoading(false);
        //     } catch (error) {
        //         setLoading(false);
        //     }
        // };
        // fetchApi();

        // // C1: fetch
        // // encodeURIComponent() mã hóa sang định dạng URL để ko vi phạm quy ước của querry parameter
        // // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
        // //     .then((res) => res.json(res))
        // // C2: axios
        // // axios
        // // C3: tối ưu với instance
        // request
        //     .get(`users/search`, {
        //         params: {
        //             q: debounced,
        //             type: 'less',
        //         },
        //     })
        //     .then((res) => {
        //         // console.log(res);
        //         setSearchResult(res.data);
        //         setLoading(false);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounced);
            setSearchResult(result);

            setLoading(false);
        };

        fetchApi();
    }, [debounced]);

    // tách hàm làm 3 việc: xóa KQ tìm kiếm, xóa text, focus lại (dùng lại hàm nhiều lần)
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        // C1: Nếu giá trị bắt đầu ko pải dấu cách thì set giá trị
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
        // C2:
        // setSearchValue(e.target.value.trimStart())
    };

    return (
        // fix cảnh báo tippy.js thêm 1 thẻ div ở ngoài bọc
        <div> 
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0} // Có 2 đk hiện KQ show: KQ tìm kiếm + showResult
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                // lấy id và truyền cả obj ra ngoài với prop là data
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={(e) => setShowResult(true)}
                    />
                    {/* !!searchValue chuyển searchValue sang dạng boolean 
                    (có searchValue và ko có loading mới hiển thị button clear -> fix icon đè nhau) */}
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {/* Có loading thì hiển thị */}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
