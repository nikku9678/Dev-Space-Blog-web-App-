'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlogCard } from '@/components/blogs/blog-card';
import { 
  Edit, 
  MapPin, 
  Calendar, 
  Users, 
  FileText, 
  Heart,
  Settings,
  Share2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const mockUser = {
  id: '1',
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  bio: 'Full-stack developer passionate about creating amazing web experiences. I love sharing knowledge and learning from the community.',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=200&h=200&fit=crop',
  location: 'San Francisco, CA',
  joinedAt: '2023-06-15T10:00:00Z',
  website: 'https://johndoe.dev',
  stats: {
    posts: 23,
    likes: 456,
    followers: 189,
    following: 97
  },
  interests: ['JavaScript', 'React', 'Next.js', 'TypeScript', 'UI/UX']
};

const mockUserBlogs = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14',
    content: 'Next.js 14 brings exciting new features...',
    excerpt: 'Discover the latest features and improvements in Next.js 14',
    author: mockUser,
    community: { id: '1', name: 'Web Development', slug: 'web-dev' },
    createdAt: '2024-01-15T10:00:00Z',
    likesCount: 24,
    commentsCount: 8,
    isLiked: false,
    tags: ['nextjs', 'react', 'webdev']
  },
  {
    id: '4',
    title: 'TypeScript Best Practices in 2024',
    content: 'TypeScript has evolved significantly...',
    excerpt: 'Modern TypeScript patterns and best practices for better code',
    author: mockUser,
    community: { id: '1', name: 'Web Development', slug: 'web-dev' },
    createdAt: '2024-01-10T14:20:00Z',
    likesCount: 31,
    commentsCount: 12,
    isLiked: true,
    tags: ['typescript', 'javascript', 'bestpractices']
  }
];

export default function ProfilePage() {
  const [user] = useState(mockUser);
  const [userBlogs, setUserBlogs] = useState(mockUserBlogs);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleLike = (blogId: string) => {
    setUserBlogs(prevBlogs => 
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${user.name}'s Profile`,
        text: user.bio,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                    <p className="text-gray-600">@{user.username}</p>
                    {user.location && (
                      <div className="flex items-center text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{user.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 mt-4 md:mt-0">
                    <Button onClick={handleShare} variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button onClick={() => setIsFollowing(!isFollowing)} size="sm">
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
                
                <p className="text-gray-700 mt-3 max-w-2xl">{user.bio}</p>
                
                <div className="flex items-center text-gray-500 mt-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    Joined {formatDistanceToNow(new Date(user.joinedAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{user.stats.posts}</div>
                <div className="text-sm text-gray-600">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{user.stats.likes}</div>
                <div className="text-sm text-gray-600">Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{user.stats.followers}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{user.stats.following}</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
            </div>

            {/* Interests */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="liked">Liked</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} onLike={handleLike} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="liked" className="space-y-6">
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No liked posts yet</h3>
              <p className="text-gray-600">Start exploring and like posts that interest you.</p>
            </div>
          </TabsContent>

          <TabsContent value="communities" className="space-y-6">
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No communities joined</h3>
              <p className="text-gray-600">Discover and join communities that match your interests.</p>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About {user.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                  <p className="text-gray-700">{user.bio}</p>
                </div>
                
                {user.website && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Website</h4>
                    <a 
                      href={user.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {user.website}
                    </a>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Joined</h4>
                  <p className="text-gray-700">
                    {formatDistanceToNow(new Date(user.joinedAt), { addSuffix: true })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}