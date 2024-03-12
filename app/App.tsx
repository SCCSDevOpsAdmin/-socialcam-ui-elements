import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from 'src/elements';

import Layout from 'app/containers/template/Layout';
import { AppRoutes } from './Routes';

type Props = {};
const App: FC<Props> = () => {
    return (
        <>
            <Router>
                <React.Suspense fallback={<LoadingSpinner />}>
                    <Layout>
                        <Routes>
                            {AppRoutes.map((route, index) => {
                                return (
                                    <Route
                                        key={index}
                                        path={route.routePath}
                                        element={route.element}
                                    />
                                );
                            })}
                        </Routes>
                    </Layout>
                </React.Suspense>
            </Router>
        </>
    );
};

export default React.memo(App);
