import {RouterProvider, createBrowserRouter, useNavigate, Link} from 'react-router-dom';
import ChallengesPage from './pages/ChallengeIndex';
import GroupsPage from './pages/GroupIndex';
import './index.css';
import {useEffect} from "react";
import Success from "./pages/Success";

const router = createBrowserRouter([{
    path: '/groups', children: [{
        element: <GroupsPage/>, index: true
    }, {
        path: ':GroupId/challenges', element: <ChallengesPage/>
    }]
}, {
    path: 'success', element: <Success/>
}, {
    path: 'failure', element: <>
        <h1>Payment Failed</h1>
        <Link to='/groups'>Go back to all groups</Link>
    </>
}, {
    path: '*', element: <NotFound/>
}]);

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/groups');
    }, [navigate]);
    return (<div>
        <p>Page Not Found. Redirecting...</p>
    </div>);
}

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
