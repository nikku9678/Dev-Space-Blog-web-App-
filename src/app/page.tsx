'use client';

import { useState, useEffect } from 'react';
import { BlogCard } from '@/components/blogs/blog-card';
// import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual API calls
const mockBlogs = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14',
    content: 'Next.js 14 brings exciting new features including the App Router, Server Components, and improved performance...',
    excerpt: 'Discover the latest features and improvements in Next.js 14',
    author: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100&h=100&fit=crop'
    },
    community: {
      id: '1',
      name: 'Web Development',
      slug: 'web-dev'
    },
    createdAt: '2024-01-15T10:00:00Z',
    likesCount: 24,
    commentsCount: 8,
    isLiked: false,
    tags: ['nextjs', 'react', 'webdev']
  },
  {
    id: '2',
    title: 'The Future of AI in Software Development',
    content: 'Artificial Intelligence is rapidly transforming how we build software. From code generation to automated testing...',
    excerpt: 'Exploring how AI is revolutionizing the software development process',
    author: {
      id: '2',
      name: 'Sarah Wilson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop'
    },
    community: {
      id: '2',
      name: 'AI & Technology',
      slug: 'ai-tech'
    },
    createdAt: '2024-01-14T15:30:00Z',
    likesCount: 42,
    commentsCount: 12,
    isLiked: true,
    tags: ['ai', 'technology', 'programming']
  },
  {
    id: '3',
    title: 'Building Scalable React Applications',
    content: 'When building large React applications, proper architecture and state management become crucial...',
    excerpt: 'Best practices for creating maintainable and scalable React apps',
    author: {
      id: '3',
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop'
    },
    community: {
      id: '1',
      name: 'Web Development',
      slug: 'web-dev'
    },
    createdAt: '2024-01-13T09:15:00Z',
    likesCount: 18,
    commentsCount: 5,
    isLiked: false,
    tags: ['react', 'architecture', 'frontend']
  }
];

export default function HomePage() {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [loading, setLoading] = useState(false);

  const handleLike = (blogId: string) => {
    setBlogs(prevBlogs => 
      prevBlogs.map(blog => 
        blog.id === blogId 
          ? { 
              ...blog, 
              isLiked: !blog.isLiked,
              likesCount: blog.isLiked ? blog.likesCount - 1 : blog.likesCount + 1
            }
          : blog
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Share Your Stories with the World
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join a vibrant community of writers and readers. Create, discover, and engage with amazing content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-5 w-5" />
                Start Writing
              </Button>
            </Link>
            <Link href="/communities">
              <Button variant="outline" size="lg">
                <Users className="mr-2 h-5 w-5" />
                Explore Communities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">2.5K+</div>
              <div className="text-gray-600">Active Writers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">15K+</div>
              <div className="text-gray-600">Blog Posts</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">50+</div>
              <div className="text-gray-600">Communities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Stories</h2>
              <p className="text-gray-600">Discover the newest content from our community</p>
            </div>
            <Button variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Trending
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard 
                key={blog.id} 
                blog={blog} 
                onLike={handleLike}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Stories
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}