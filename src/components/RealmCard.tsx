
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Lock, Star, Crown, Shield, Zap, Globe } from "lucide-react";

interface RealmCardProps {
  realm: {
    id: string;
    name: string;
    description: string;
    theme: string;
    color: string;
    icon: string;
    courses: any[];
    isUnlocked: boolean;
    completedCourses: number;
    requiredCourses?: number;
    level: number;
  };
  onEnterRealm: (realmId: string) => void;
  userProgress: number;
}

const RealmCard = ({ realm, onEnterRealm, userProgress }: RealmCardProps) => {
  const progressPercentage = (realm.completedCourses / realm.courses.length) * 100;
  
  const getRealmIcon = (iconName: string) => {
    switch (iconName) {
      case "crown": return <Crown className="w-8 h-8" />;
      case "shield": return <Shield className="w-8 h-8" />;
      case "zap": return <Zap className="w-8 h-8" />;
      case "globe": return <Globe className="w-8 h-8" />;
      default: return <Star className="w-8 h-8" />;
    }
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${realm.color} ${!realm.isUnlocked ? 'opacity-60' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
      
      <CardHeader className="relative z-10 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            {getRealmIcon(realm.icon)}
          </div>
          {!realm.isUnlocked && (
            <Lock className="w-6 h-6 text-white/70" />
          )}
        </div>
        
        <CardTitle className="text-2xl font-bold text-white">
          {realm.name}
        </CardTitle>
        
        <p className="text-white/90 text-sm">
          {realm.description}
        </p>
        
        <div className="flex items-center space-x-2 mt-2">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Level {realm.level}
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {realm.courses.length} Courses
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 text-white">
        <div className="space-y-4">
          {realm.isUnlocked ? (
            <>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{realm.completedCourses}/{realm.courses.length}</span>
                </div>
                <Progress value={progressPercentage} className="h-2 bg-white/20" />
              </div>
              
              <Button
                onClick={() => onEnterRealm(realm.id)}
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                variant="outline"
              >
                Enter {realm.name}
              </Button>
            </>
          ) : (
            <div className="text-center space-y-2">
              <p className="text-white/70 text-sm">
                Complete {realm.requiredCourses} courses to unlock
              </p>
              <Button 
                disabled 
                className="w-full bg-white/10 text-white/50"
                variant="outline"
              >
                <Lock className="w-4 h-4 mr-2" />
                Locked
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealmCard;
