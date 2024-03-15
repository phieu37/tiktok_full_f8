import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import images from '~/assets/images';
import styles from './Image.module.scss';

// ref do forwardRef đưa xuống
// khi component Image được mounted vào nó sẽ bê ref của img forward ra ngoài cho
// Image thì Tippy sẽ nhận được
// đổi tên fallback thành customFallback để tránh trùng tên với fallback bên trong useState
// hoặc sửa fallback trong useState thành _fallback
// Khi ko truyền fallback từ ngoài vào sẽ lấy: images.noImage, khi có truyền fallback từ ngoài
// vào thì images.noImage ko được sử dụng mà lấy từ bên ngoài
const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    // xử lý nếu ảnh lỗi thì lấy ảnh lỗi
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };

    // styles.wrapper là file scss của chính nó Image.module.scss -> chung
    // custom css class riêng sẽ vào className -> riêng
    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

// validate
Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
