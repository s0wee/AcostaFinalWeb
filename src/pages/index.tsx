import React from "react";
import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios';
import Main from "@/layout/mainLayout";
import { Container, Typography, Card, CardContent, Button } from '@material-ui/core';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Post {
  title: string;
  content: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  post: Post[];
}

const Home: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  const timesNewRomanStyle = { fontFamily: 'Times New Roman' };

  return (
    <Main>
      <Container className='profile-section'>
      <div className='container mx-auto flex justify-center items-center'>
        <nav className='flex justify-end'>
          <Link href="/" className='mx-8'>
            Home
          </Link>
          <Link href="/profile" className='mx-8'>
            Profile
          </Link>
          <Link href="/posts" className='mx-8'>
            Posts
          </Link>
        </nav>
      </div>
        <Card style={{ padding: '2rem', marginTop: '2rem', width: '80%', maxWidth: '800px', margin: 'auto' }}>
          <div className="mb-40">
            <Typography variant="h3" gutterBottom style={timesNewRomanStyle}>{data.name}</Typography>
            <Typography variant="h5" gutterBottom style={{ color: 'black', ...timesNewRomanStyle }}>{data.email}</Typography>
            <Typography variant="body2" gutterBottom style={{ color: 'black', ...timesNewRomanStyle }}>{data.bio}</Typography>
          </div>
          <Typography variant="h3" gutterBottom style={{ marginTop: '2rem', ...timesNewRomanStyle }}>Posts</Typography>
          {data.post.map((post, index) => (
            <div key={index} style={{ marginBottom: '3rem' }}>
              <Typography variant="h6" gutterBottom style={{ color: 'black', ...timesNewRomanStyle }}>{post.title}</Typography>
              <Typography variant="body2" gutterBottom style={{ color: 'black', ...timesNewRomanStyle }}>{post.content}</Typography>
            </div>
          ))}
          <Link href="/profile">
          </Link>
        </Card>
      </Container>
    </Main>
  );
};

export default Home;