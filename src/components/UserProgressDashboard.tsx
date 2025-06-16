
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Flame, Star } from "lucide-react";

interface UserProgressDashboardProps {
  totalCourses: number;
  completedCourses: number;
  currentRealm: string;
  unlockedRealms: number;
  totalRealms: number;
  achievements: string[];
}

const UserProgressDashboard = ({
  totalCourses,
  completedCourses,
  currentRealm,
  unlockedRealms,
  totalRealms,
  achievements
}: UserProgressDashboardProps) => {
  const overallProgress = (completedCourses / totalCourses) * 100;
  const realmProgress = (unlockedRealms / totalRealms) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Overall Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">{Math.round(overallProgress)}%</div>
          <Progress value={overallProgress} className="h-2 bg-white/20" />
          <p className="text-sm mt-2 text-white/80">
            {completedCourses} of {totalCourses} courses completed
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Star className="w-5 h-5" />
            <span>Current Realm</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold mb-2">{currentRealm}</div>
          <Badge className="bg-white/20 text-white border-white/30">
            Active Learning Path
          </Badge>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Flame className="w-5 h-5" />
            <span>Realms Unlocked</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">{unlockedRealms}/{totalRealms}</div>
          <Progress value={realmProgress} className="h-2 bg-white/20" />
          <p className="text-sm mt-2 text-white/80">Realm progression</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">{achievements.length}</div>
          <p className="text-sm text-white/80">Badges earned</p>
          <div className="flex space-x-1 mt-2">
            {achievements.slice(0, 3).map((achievement, index) => (
              <Badge key={index} className="bg-white/20 text-white border-white/30 text-xs">
                {achievement}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProgressDashboard;
