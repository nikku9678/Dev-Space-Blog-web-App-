import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Users, FileText, ThumbsUp, Eye, BarChart3, Activity } from "lucide-react";

const UserDashboard = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 text-black rounded-2xl">
        <div>
          <h2 className="text-3xl font-bold">Hello, Nikku</h2>
          <p className="text-sm text-black-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consequatur!
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button className="flex items-center gap-2 bg-white text-red-600 hover:bg-gray-100">
            <FileText size={18} /> Create Post
          </Button>
          <Button className="flex items-center gap-2 bg-white text-red-600 hover:bg-gray-100">
            <Users size={18} /> Create Community
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={20} /> Total Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">120</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} /> Communities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye size={20} /> Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">5.6k</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThumbsUp size={20} /> Likes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2.3k</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 size={20} /> Engagement Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Chart / Graph placeholder</p>
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
              📊
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={20} /> Growth Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Chart / Graph placeholder</p>
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
              📈
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
