'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";



const page = () => {

    const { data: session } = useSession();

    const router = useRouter();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data)
        }

        if (session?.user.id) fetchPost();
    }, []);



    const handleDelete = async (post) => {
        const hashConfirmed = confirm('are ypu sure you want to delete prompt');

        if (hashConfirmed) {
            try {
                await fetch(`api/prompt/${post._id.toString()}`, { method: 'DELETE' });

                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleEdit = async (post) => {
        router.push(`/update-prompt/?id=${post._id}`)

    }
    return (
        <Profile
            name="My"
            desc="welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}


        />
    )
}

export default page
