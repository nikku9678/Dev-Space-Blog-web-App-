'use client';

import { useState } from 'react';
// import { Header } from '@/components/layout/header';
import { CommunityCard } from '@/components/community/community-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const mockCommunities = [
  {
    id: '1',
    name: 'Web Development',
    slug: 'web-dev',
    description: 'Discuss the latest in web technologies, frameworks, and best practices.',
    memberCount: 1250,
    postCount: 3420,
    isJoined: true,
    avatar: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=100&h=100&fit=crop',
    tags: ['JavaScript', 'React', 'Next.js', 'CSS']
  },
  {
    id: '2',
    name: 'AI & Technology',
    slug: 'ai-tech',
    description: 'Explore artificial intelligence, machine learning, and emerging technologies.',
    memberCount: 890,
    postCount: 1650,
    isJoined: false,
    avatar: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?w=100&h=100&fit=crop',
    tags: ['AI', 'Machine Learning', 'Python', 'Data Science']
  },
  {
    id: '3',
    name: 'Design & UX',
    slug: 'design',
    description: 'Share design inspiration, UX principles, and creative processes.',
    memberCount: 750,
    postCount: 980,
    isJoined: true,
    avatar: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=100&h=100&fit=crop',
    tags: ['UI/UX', 'Figma', 'Design System', 'Typography']
  },
  {
    id: '4',
    name: 'Startup Stories',
    slug: 'startup',
    description: 'Entrepreneurship, startup advice, and business insights.',
    memberCount: 520,
    postCount: 740,
    isJoined: false,
    avatar: 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?w=100&h=100&fit=crop',
    tags: ['Entrepreneurship', 'Business', 'Funding', 'Growth']
  },
  {
    id: '5',
    name: 'DevOps & Cloud',
    slug: 'devops',
    description: 'Cloud computing, infrastructure, and deployment strategies.',
    memberCount: 680,
    postCount: 1120,
    isJoined: false,
    avatar: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?w=100&h=100&fit=crop',
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
  },
  {
    id: '6',
    name: 'Mobile Development',
    slug: 'mobile',
    description: 'iOS, Android, and cross-platform mobile app development.',
    memberCount: 450,
    postCount: 620,
    isJoined: true,
    avatar: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?w=100&h=100&fit=crop',
    tags: ['React Native', 'Flutter', 'iOS', 'Android']
  }
];

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState(mockCommunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleJoinCommunity = (communityId: string) => {
    setCommunities(prevCommunities =>
      prevCommunities.map(community =>
        community.id === communityId
          ? { 
              ...community, 
              isJoined: !community.isJoined,
              memberCount: community.isJoined ? community.memberCount - 1 : community.memberCount + 1
            }
          : community
      )
    );
  };

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['all', 'joined', 'trending', 'new'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Communities</h1>
            <p className="text-gray-600">Discover and join communities that match your interests</p>
          </div>
          <Link href="/community/create">
            <Button className="bg-blue-600 hover:bg-blue-700 mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" />
              Create Community
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Communities */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Trending Communities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.slice(0, 3).map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                onJoin={handleJoinCommunity}
                featured
              />
            ))}
          </div>
        </div>

        {/* All Communities */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">All Communities</h2>
            <Badge variant="secondary">{filteredCommunities.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                onJoin={handleJoinCommunity}
              />
            ))}
          </div>
        </div>

        {filteredCommunities.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No communities found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms or create a new community.</p>
            <Link href="/communities/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Community
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}