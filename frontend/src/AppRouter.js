import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PostEdit from './pages/PostEdit';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Posts from './pages/Posts';
import PostView from './pages/PostView';
import Profile from './pages/Profile';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/posts" component={Posts} />
                <Route path="/post_edit/:id" component={PostEdit} />
                <Route path="/post_edit/" component={PostEdit} />
                <Route path={`/post/:id`} component={PostView} />
                <Route component={Error404} />
            </Switch>
        </BrowserRouter>
    );
}