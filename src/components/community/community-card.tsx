'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, FileText, Star } from 'lucide-react';

interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  memberCount: number;
  postCount: number;
  isJoined: boolean;
  avatar: string;
  tags: string[];
}

interface CommunityCardProps {
  community: Community;
  onJoin: (communityId: string) => void;
  featured?: boolean;
}

export function CommunityCard({ community, onJoin, featured }: CommunityCardProps) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 ${featured ? 'ring-2 ring-blue-200' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={community.avatar} />
            <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link href={`/community/${community.slug}`}>
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors truncate">
                  {community.name}
                </h3>
              </Link>
              {featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {community.description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{community.memberCount.toLocaleString()} members</span>
          </div>
          <div className="flex items-center space-x-1">
            <FileText className="h-4 w-4" />
            <span>{community.postCount.toLocaleString()} posts</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {community.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {community.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{community.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t">
        <div className="flex space-x-2 w-full">
          <Link href={`/community/${community.slug}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View
            </Button>
          </Link>
          <Button
            onClick={() => onJoin(community.id)}
            className={`flex-1 ${
              community.isJoined 
                ? 'bg-gray-600 hover:bg-gray-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {community.isJoined ? 'Joined' : 'Join'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}