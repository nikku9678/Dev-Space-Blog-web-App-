'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Users, X, Plus, Globe, Lock } from 'lucide-react';
import { toast } from 'sonner';

const categories = [
  'Technology',
  'Design',
  'Business',
  'Science',
  'Art',
  'Sports',
  'Education',
  'Health',
  'Travel',
  'Food',
  'Gaming',
  'Music'
];

export default function CreateCommunityPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [rules, setRules] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 10) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim() || !category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      toast.success('Community created successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
   
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Community</h1>
          <p className="text-gray-600">Build a space for like-minded people to connect and share ideas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Community Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., React Developers"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your community is about..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rules">Community Rules</Label>
                  <Textarea
                    id="rules"
                    placeholder="Set guidelines for your community..."
                    value={rules}
                    onChange={(e) => setRules(e.target.value)}
                    className="mt-1 h-32"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Visibility</Label>
                  <Select value={visibility} onValueChange={setVisibility}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          Public
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 mr-2" />
                          Private
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    {visibility === 'public' 
                      ? 'Anyone can view and join this community'
                      : 'Only invited members can join'
                    }
                  </p>
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      placeholder="Add a tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddTag}
                      disabled={tags.length >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-red-500"
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {tags.length}/10 tags
                  </p>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isCreating}
                >
                  <Users className="mr-2 h-4 w-4" />
                  {isCreating ? 'Creating...' : 'Create Community'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Choose a clear, descriptive name</li>
                  <li>• Write a compelling description</li>
                  <li>• Set clear community rules</li>
                  <li>• Use relevant tags for discoverability</li>
                  <li>• Foster a welcoming environment</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}