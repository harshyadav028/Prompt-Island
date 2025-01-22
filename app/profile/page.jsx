"use client";

import { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { useSession } from "@node_modules/next-auth/react";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((item) => item._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Check session status and only proceed if session is available
  useEffect(() => {
    if (status === "loading") return; // Do nothing if session is still loading
    if (!session) {
      console.log("Session not available");
      return;
    }

    console.log("Session user ID:", session.user.id);

    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session.user.id}/posts`);
      const data = await response.json();
      console.log("Fetched posts:", data);
      setPosts(data);
    };

    if (session?.user?.id) {
      fetchPosts();
    }
  }, [session, status]); // Adding status to the dependency array to track loading state

  if (status === "loading") return <div>Loading...</div>; // Show loading state

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
