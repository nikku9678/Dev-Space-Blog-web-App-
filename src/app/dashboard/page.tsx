'use client';

import { useState } from 'react';
// import { Header } from '@/components/l';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  BarChart3,
  FileText,
  Clock,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

const mockUserBlogs = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14',
    excerpt: 'Discover the latest features and improvements in Next.js 14',
    status: 'published',
    community: 'Web Development',
    createdAt: '2024-01-15T10:00:00Z',
    views: 1250,
    likes: 24,
    comments: 8
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    excerpt: 'Modern TypeScript patterns for better code',
    status: 'draft',
    community: 'Web Development',
    createdAt: '2024-01-14T15:30:00Z',
    views: 0,
    likes: 0,
    comments: 0
  },
  {
    id: '3',
    title: 'Building Scalable React Apps',
    excerpt: 'Architecture patterns for large React applications',
    status: 'published',
    community: 'Web Development',
    createdAt: '2024-01-10T09:15:00Z',
    views: 890,
    likes: 18,
    comments: 5
  }
];

export default function DashboardPage() {
  const [blogs, setBlogs] = useState(mockUserBlogs);
  
  const publishedBlogs = blogs.filter(blog => blog.status === 'published');
  const draftBlogs = blogs.filter(blog => blog.status === 'draft');
  
  const totalViews = publishedBlogs.reduce((sum, blog) => sum + blog.views, 0);
  const totalLikes = publishedBlogs.reduce((sum, blog) => sum + blog.likes, 0);
  const totalComments = publishedBlogs.reduce((sum, blog) => sum + blog.comments, 0);

  const handleDelete = (blogId: string) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
  };

  const BlogRow = ({ blog }: { blog: typeof mockUserBlogs[0] }) => (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-gray-900">{blog.title}</h3>
              <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
                {blog.status}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-2">{blog.excerpt}</p>
            <div className="flex items-center text-xs text-gray-500 space-x-4">
              <span>{blog.community}</span>
              <span>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</span>
              {blog.status === 'published' && (
                <>
                  <span className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {blog.views}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {blog.likes}
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-3 md:mt-0">
            {blog.status === 'published' && (
              <Link href={`/blog/${blog.id}`}>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </Link>
            )}
            <Link href={`/edit/${blog.id}`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDelete(blog.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
            <p className="text-gray-600">Manage your blog posts and track your progress</p>
          </div>
          <Link href="/create">
            <Button className="bg-blue-600 hover:bg-blue-700 mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{publishedBlogs.length}</p>
                  <p className="text-sm text-gray-600">Published Posts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{draftBlogs.length}</p>
                  <p className="text-sm text-gray-600">Drafts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{totalLikes}</p>
                  <p className="text-sm text-gray-600">Total Likes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Management */}
        <Tabs defaultValue="published" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="published">Published ({publishedBlogs.length})</TabsTrigger>
            <TabsTrigger value="drafts">Drafts ({draftBlogs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="published" className="space-y-4">
            {publishedBlogs.length > 0 ? (
              publishedBlogs.map((blog) => <BlogRow key={blog.id} blog={blog} />)
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No published posts yet</h3>
                  <p className="text-gray-600 mb-4">Start writing and share your ideas with the community.</p>
                  <Link href="/create">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Post
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="drafts" className="space-y-4">
            {draftBlogs.length > 0 ? (
              draftBlogs.map((blog) => <BlogRow key={blog.id} blog={blog} />)
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No drafts</h3>
                  <p className="text-gray-600">All your draft posts will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}