import { Card } from "../components/index";
import { useEffect, useState } from "react";
import dbService from "../service/dbservice";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const postPreview = async () => {
      try {
        const posts = await dbService.getPosts([]);
        if (posts) {
          setPosts(posts.documents);
        }
      } catch (error) {
        console.log("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };
    postPreview();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex gap-4">
          <div className="space-y-4">
            {posts?.map((post, i) => (
              <Link to={`/post/${post.$id}`} key={i}>
                <Card {...post}/>
              </Link>
            ))}
          </div>
          <aside className="lg:w-1/3 flex-shrink-0">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
              <ul className="">
                {posts.map((post, i) => (
                  <li key={i}>
                    <Link
                      to={`/post/${post.$id}`}
                      className="text-gray-600 hover:text-gray-900 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
