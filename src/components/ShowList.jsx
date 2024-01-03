import { useState, useEffect } from "react";
export default function ShowList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch("http://127.0.0.1:8000/quickstart");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, []);

  return (
    <>
      {" "}
      <h2>SNIPPETS OF CODE</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.code}</p>
          <p>{post.linenos}</p>
          <p>{post.language}</p>
          <p>{post.style}</p>
          <p>{post.owner}</p>
        </div>
      ))}
    </>
  );
}
