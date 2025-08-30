'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  community: {
    id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tags: string[];
}

interface BlogCardProps {
  blog: Blog;
  onLike: (blogId: string) => void;
}

export function BlogCard({ blog, onLike }: BlogCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: `/blog/${blog.id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/blog/${blog.id}`);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <Link href={`/community/${blog.community.slug}`}>
            <Badge variant="secondary" className="hover:bg-blue-100 transition-colors">
              {blog.community.name}
            </Badge>
          </Link>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
          </span>
        </div>
        
        <Link href={`/blog/${blog.id}`}>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {blog.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-gray-600 line-clamp-3 mb-4">
          {blog.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {blog.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t">
        <div className="flex items-center justify-between w-full">
          <Link href={`/profile/${blog.author.id}`} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Avatar className="h-8 w-8">
              <AvatarImage src={blog.author.avatar} />
              <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-700">{blog.author.name}</span>
          </Link>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(blog.id)}
              className={`flex items-center space-x-1 ${blog.isLiked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Heart className={`h-4 w-4 ${blog.isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{blog.likesCount}</span>
            </Button>
            
            <Link href={`/blog/${blog.id}#comments`}>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{blog.commentsCount}</span>
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-gray-500 hover:text-gray-700"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`${isBookmarked ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}