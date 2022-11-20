import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const page = useRef<number>(1);
  const observerTargetEl = useRef<HTMLDivElement>(null);

  const fetch = useCallback(async () => {
    try {
      const { data } = await axios.get<Post[]>(
        `http://localhost:5000/posts?_limit=10&_page=${page.current}`
      );
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setHasNextPage(data.length === 10);
      if (data.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!observerTargetEl.current || !hasNextPage) return;

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) fetch();
      });

      // if (entries[0].isIntersecting) {
      //   fetch();
      // }
    });
    io.observe(observerTargetEl.current);

    return () => {
      io.disconnect();
    };
  }, [fetch, hasNextPage]);

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '50px' }}>
        Infinite Scrolling Example
      </h1>
      <div>
        {posts?.map((post) => (
          <div
            key={post.id}
            style={{
              marginBottom: '1rem',
              border: '1px solid #000',
              padding: '8px',
              background: post.id % 10 === 0 ? 'skyblue' : '',
            }}
          >
            <div>userId: {post.userId}</div>
            <div>id: {post.id}</div>
            <div>title: {post.title}</div>
            <div>body: {post.body}</div>
          </div>
        ))}
        <div ref={observerTargetEl} />
      </div>
    </>
  );
}

export default App;
