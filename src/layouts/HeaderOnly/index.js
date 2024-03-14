import Header from '~/layouts/components/Header';

// chứa all layout hiện tại
// content động truyền từ ngoài vào -> children
function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
