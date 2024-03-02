// import Header from '../components/Header';
import Header from '~/components/Layout/components/Header';
import Sidebar from './Sidebar';

// chứa all layout hiện tại
// content động truyền từ ngoài vào -> children
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
