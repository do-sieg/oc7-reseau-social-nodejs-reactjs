import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import ErrorBlock from "../components/ErrorBlock";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { appFetch } from "../utils/fetch";
import { deleteToken } from "../utils/token";






export default function Posts() {
    const history = useHistory();

    // const [load, setLoad] = useState(true);
    const [load, setLoad] = useState(false); // TEST
    const [pageError, setPageError] = useState();


    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        loadPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadPosts() {
        setLoad(true);
        const result = await appFetch('get', '/posts');
        if (result.status !== 200) {
            if (result.status === 401) {
                deleteToken();
                history.push("/");
            }
            setPageError(result.status);
            setLoad(false);
            return;
        }

        setPostsList(result.data);
        setLoad(false);
    }


    function handleStartPost(e) {
        e.preventDefault();
        history.push("/post_edit");
    }

    return (
        <AuthLayout>
            {load ?
                <Loader />
                :
                pageError ?
                    <ErrorBlock errCode={pageError} />
                    :
                    <>
                        <button onClick={handleStartPost}>Créer une publication</button>

                        <div className="posts-list">
                            {postsList.map((post) => {
                                return (
                                    <>
                                        <Post key={post.id} post={post} />
                                        <div className="post-actions">
                                            <Link to={`/post/${post.id}`}>Répondre</Link>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </>
            }
        </AuthLayout>
    );
}