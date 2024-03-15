import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
// import DefaultLayout from '~/layouts/DefaultLayout';
// import { DefaultLayout } from '~/layouts';
import DefaultLayout from '~/layouts';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        // đặt biến ra ngoài vì phải truyền vào element
                        const Page = route.component;

                        // let Layout = route.layout ? route.layout : route.layout === null ? Fragment : DefaultLayout;
                        // Layout mặc định
                        let Layout = DefaultLayout;
                        // Nếu có layout thì layout = layout ngược lại ko có
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
