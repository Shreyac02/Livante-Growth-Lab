
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CourseModal } from "@/components/CourseModal";
import { GameModal } from "@/components/GameModal";
import RealmCard from "@/components/RealmCard";
import UserProgressDashboard from "@/components/UserProgressDashboard";
import RealmTransition from "@/components/RealmTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, PlayCircle, Target, Gamepad2, MapPin } from "lucide-react";
import { realmsData, achievements } from "@/data/realmsData";
import { useRealmTheme } from "@/hooks/useRealmTheme";
import type { AuthUser } from "@/lib/auth";

interface CoursesProps {
  user: AuthUser | null;
  onAuthRequired: () => void;
  onSubscriptionRequired: () => void;
}

const Courses = ({ user, onAuthRequired, onSubscriptionRequired }: CoursesProps) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showGameModal, setShowGameModal] = useState(false);
  const [selectedGameCourse, setSelectedGameCourse] = useState(null);
  const [activeRealm, setActiveRealm] = useState<string | null>(null);

  // Mock user progress - in a real app, this would come from your backend
  const [userProgress] = useState({
    completedCourses: 0,
    currentRealm: "Foundation Realm",
    unlockedRealms: 1,
    completedCoursesPerRealm: {
      "foundation": 0,
      "life-mastery": 0,
      "elite-skills": 0,
      "mastery": 0
    }
  });

  // Get current realm based on progress
  const getCurrentRealm = () => {
    const completedCourses = userProgress.completedCourses;
    if (completedCourses >= 8) return 'mastery';
    if (completedCourses >= 5) return 'elite-skills';
    if (completedCourses >= 2) return 'life-mastery';
    return 'foundation';
  };

  const getNextRealm = () => {
    const current = getCurrentRealm();
    const realmOrder = ['foundation', 'life-mastery', 'elite-skills', 'mastery'];
    const currentIndex = realmOrder.indexOf(current);
    return currentIndex < realmOrder.length - 1 ? realmOrder[currentIndex + 1] : null;
  };

  const getCurrentRealmLevel = () => {
    const current = getCurrentRealm();
    return realmsData[Object.keys(realmsData).find(key => realmsData[key].id === current)]?.level || 1;
  };

  const currentRealmId = getCurrentRealm();
  const { theme, isTransitioning } = useRealmTheme(currentRealmId);

  // Apply dynamic theme to document root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--realm-primary', theme.primaryColor);
    root.style.setProperty('--realm-secondary', theme.secondaryColor);
    root.style.setProperty('--realm-accent', theme.accentColor);
  }, [theme]);

  // Calculate total courses across all realms
  const totalCourses = Object.values(realmsData).reduce((total, realm) => total + realm.courses.length, 0);

  // Update realm unlock status with mystery elements
  const realmsWithProgress = Object.fromEntries(
    Object.entries(realmsData).map(([key, realm]) => {
      const completedInRealm = userProgress.completedCoursesPerRealm[realm.id] || 0;
      const isUnlocked = realm.level === 1 || userProgress.completedCourses >= (realm.requiredCourses || 0);
      
      // Hide future realms for mystery effect
      const shouldShow = realm.level <= getCurrentRealmLevel() + 1;
      
      return [key, {
        ...realm,
        isUnlocked,
        completedCourses: completedInRealm,
        isVisible: shouldShow
      }];
    })
  );

  const handleStartLearning = useCallback((course) => {
    if (!user) {
      onAuthRequired();
      return;
    }

    if (user.subscription_status === 'free') {
      onSubscriptionRequired();
      return;
    }

    setSelectedCourse(course);
  }, [user, onAuthRequired, onSubscriptionRequired]);

  const handlePlayGame = useCallback((course) => {
    if (!user) {
      onAuthRequired();
      return;
    }

    setSelectedGameCourse(course);
    setShowGameModal(true);
  }, [user, onAuthRequired]);

  const handleEnterRealm = (realmId: string) => {
    setActiveRealm(realmId);
  };

  const handleBackToRealms = () => {
    setActiveRealm(null);
  };

  const renderRealmView = () => {
    if (!activeRealm) return null;
    
    const realm = realmsWithProgress[Object.keys(realmsWithProgress).find(key => 
      realmsWithProgress[key].id === activeRealm
    )];
    
    if (!realm) return null;

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{realm.name}</h2>
            <p className="text-blue-100">{realm.description}</p>
            <Badge className="mt-2 bg-white/20 text-white border-white/30">
              Level {realm.level} • {realm.courses.length} Courses
            </Badge>
          </div>
          <Button 
            variant="outline" 
            onClick={handleBackToRealms}
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Back to Realms
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {realm.courses.map((course) => (
            <Card 
              key={course.id} 
              className="hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/15"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 ${course.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                    {course.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                    {course.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-white hover:text-blue-300 transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-blue-100 line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-blue-200">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">
                      <PlayCircle className="w-4 h-4 inline mr-1" />
                      {course.videos} videos
                    </span>
                    <span className="text-blue-200">
                      <Target className="w-4 h-4 inline mr-1" />
                      {course.exercises} exercises
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
                      onClick={() => handlePlayGame(course)}
                    >
                      <Gamepad2 className="w-4 h-4 mr-1.5" />
                      🎮 Challenge Me!
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600"
                      onClick={() => handleStartLearning(course)}
                    >
                      Start Learning
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const handleRealmUnlock = (realmId: string) => {
    console.log(`Realm unlocked: ${realmId}`);
    // Here you would typically update the backend/database
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${isTransitioning ? 'scale-105 blur-sm' : ''}`}>
      <div className={`py-20 px-4 bg-gradient-to-br ${theme.backgroundGradient} min-h-screen transition-all duration-1000`}>
        <div className="container mx-auto">
          {!activeRealm ? (
            <>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{backgroundImage: `linear-gradient(to right, ${theme.accentColor}, ${theme.primaryColor})`}}>
                    {theme.name}
                  </span>
                </h2>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                  Progress through mysterious realms. Each completion reveals new paths of mastery.
                </p>
              </div>

              <UserProgressDashboard
                totalCourses={totalCourses}
                completedCourses={userProgress.completedCourses}
                currentRealm={theme.name}
                unlockedRealms={userProgress.unlockedRealms}
                totalRealms={Object.keys(realmsData).length}
                achievements={achievements.slice(0, userProgress.completedCourses)}
              />

              <div className="space-y-16">
                <Tabs defaultValue="realms" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 backdrop-blur-lg">
                    <TabsTrigger value="realms" className="text-white data-[state=active]:bg-white/20">
                      Learning Realms
                    </TabsTrigger>
                    <TabsTrigger value="map" className="text-white data-[state=active]:bg-white/20">
                      Progress Map
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="realms" className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {Object.values(realmsWithProgress)
                        .filter(realm => realm.isVisible)
                        .map((realm) => (
                        <RealmCard
                          key={realm.id}
                          realm={realm}
                          onEnterRealm={handleEnterRealm}
                          userProgress={userProgress.completedCourses}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="map" className="space-y-8">
                    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                      <CardHeader>
                        <CardTitle>Your Learning Journey</CardTitle>
                        <CardDescription className="text-blue-100">
                          Track your progression through each realm
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {Object.values(realmsWithProgress).map((realm, index) => (
                            <div key={realm.id} className="flex items-center space-x-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                realm.isUnlocked ? 'bg-green-500' : 'bg-gray-500'
                              }`}>
                                {realm.isUnlocked ? '✓' : index + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold">{realm.name}</h4>
                                <p className="text-sm text-blue-200">
                                  {realm.completedCourses}/{realm.courses.length} courses completed
                                </p>
                              </div>
                              <Badge variant={realm.isUnlocked ? "default" : "secondary"}>
                                Level {realm.level}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          ) : (
            renderRealmView()
          )}

          <RealmTransition
            currentRealm={theme.name}
            nextRealm={getNextRealm()}
            progress={(userProgress.completedCourses / totalCourses) * 100}
            onRealmUnlock={handleRealmUnlock}
          />

          {selectedCourse && (
            <CourseModal
              course={selectedCourse}
              onClose={() => setSelectedCourse(null)}
            />
          )}

          {showGameModal && selectedGameCourse && (
            <GameModal
              isOpen={showGameModal}
              onClose={() => {
                setShowGameModal(false);
                setSelectedGameCourse(null);
              }}
              courseId={selectedGameCourse.id}
              courseName={selectedGameCourse.title}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;