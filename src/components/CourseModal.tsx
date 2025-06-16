import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Award, PlayCircle, Target, CheckCircle, Star, Lock, Crown, Zap } from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  students: string;
  rating: number;
  exercises: number;
  videos: number;
  benefits: string[];
  modules: string[];
  icon: string;
  color: string;
}

interface CourseModalProps {
  course: Course;
  onClose: () => void;
}

export const CourseModal = ({ course, onClose }: CourseModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [enrolledModules, setEnrolledModules] = useState<number[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false); // Mock subscription status
  const [showPricing, setShowPricing] = useState(false);

  const handleEnrollModule = (index: number) => {
    if (!enrolledModules.includes(index)) {
      setEnrolledModules([...enrolledModules, index]);
    }
  };

  const handleSubscribe = (plan: string) => {
    console.log(`Subscribing to ${plan} plan`);
    setIsSubscribed(true);
    setShowPricing(false);
    // Here you would integrate with your payment system
  };

  const progress = (enrolledModules.length / course.modules.length) * 100;

  const sampleVideos = [
    { title: "Introduction & Getting Started", duration: "5:30", type: "video", isFree: true },
    { title: "Essential Tools Overview", duration: "8:15", type: "video", isFree: false },
    { title: "Hands-on Practice Session", duration: "12:45", type: "exercise", isFree: false },
    { title: "Common Mistakes to Avoid", duration: "6:20", type: "video", isFree: false },
    { title: "Final Project Walkthrough", duration: "15:30", type: "project", isFree: false }
  ];

  const pricingPlans = [
    {
      name: "Weekly",
      priceUSD: "$9.99",
      priceINR: "₹829",
      period: "/week",
      description: "Perfect for short-term learning",
      features: ["All courses unlocked", "Download certificates", "Priority support", "Mobile access"],
      popular: false,
      savings: null
    },
    {
      name: "Monthly",
      priceUSD: "$24.99",
      priceINR: "₹2,079",
      period: "/month", 
      description: "Most popular choice",
      features: ["All courses unlocked", "Download certificates", "Priority support", "Mobile access", "Exclusive workshops"],
      popular: true,
      savings: "Save 37% vs Weekly"
    },
    {
      name: "Yearly",
      priceUSD: "$199.99",
      priceINR: "₹16,639",
      period: "/year",
      description: "Best value for committed learners",
      features: ["All courses unlocked", "Download certificates", "Priority support", "Mobile access", "Exclusive workshops", "1-on-1 mentoring sessions"],
      popular: false,
      savings: "Save 67% vs Monthly"
    }
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-16 h-16 ${course.color} rounded-xl flex items-center justify-center text-3xl shadow-lg`}>
              {course.icon}
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {course.title}
              </DialogTitle>
              <p className="text-gray-600 mt-1">{course.description}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="secondary">{course.difficulty}</Badge>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        {showPricing ? (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Learning Plan</h3>
              <p className="text-gray-600">Unlock all courses and premium features</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-lg' : 'border'}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white px-3 py-1 text-xs">
                        <Crown className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <div className="text-2xl font-bold text-gray-900">{plan.priceUSD}</div>
                      <div className="text-lg font-medium text-gray-700">{plan.priceINR}</div>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                    {plan.savings && (
                      <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                        {plan.savings}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      onClick={() => handleSubscribe(plan.name)}
                    >
                      {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                      Choose {plan.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button variant="outline" onClick={() => setShowPricing(false)}>
                Back to Course
              </Button>
            </div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Subscription Status Banner */}
              {!isSubscribed && (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-yellow-800">Limited Access</p>
                          <p className="text-sm text-yellow-700">Only the first video in each course is free. Subscribe to unlock all content!</p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => setShowPricing(true)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>What You'll Learn</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>Course Stats</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Video Lessons:</span>
                      <span className="font-medium">{course.videos}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Exercises:</span>
                      <span className="font-medium">{course.exercises}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <Badge variant="secondary">{course.difficulty}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex space-x-4">
                {isSubscribed ? (
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Start Learning Now
                  </Button>
                ) : (
                  <Button 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => setShowPricing(true)}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Subscribe to Learn
                  </Button>
                )}
                <Button variant="outline" className="flex-1">
                  Add to Wishlist
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-4">
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Module {index + 1}: {module}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          {enrolledModules.includes(index) ? (
                            <Badge className="bg-green-500">Completed</Badge>
                          ) : isSubscribed || index === 0 ? (
                            <Button 
                              size="sm" 
                              onClick={() => handleEnrollModule(index)}
                            >
                              Start Module
                            </Button>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <Lock className="w-4 h-4 text-gray-400" />
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setShowPricing(true)}
                              >
                                Unlock
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <PlayCircle className="w-4 h-4" />
                          <span>2-3 videos</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>1-2 exercises</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>~2 hours</span>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <div className="space-y-3">
                {sampleVideos.map((video, index) => (
                  <Card key={index} className={`hover:shadow-md transition-shadow ${!video.isFree && !isSubscribed ? 'opacity-75' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${video.isFree || isSubscribed ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            {video.isFree || isSubscribed ? (
                              <PlayCircle className="w-5 h-5 text-blue-600" />
                            ) : (
                              <Lock className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-gray-900">{video.title}</h4>
                              {video.isFree && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  Free
                                </Badge>
                              )}
                              {!video.isFree && !isSubscribed && (
                                <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                                  <Lock className="w-3 h-3 mr-1" />
                                  Premium
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {video.type === 'video' ? 'Video Lesson' : 
                               video.type === 'exercise' ? 'Exercise' : 'Project'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{video.duration}</span>
                          {video.isFree || isSubscribed ? (
                            <Button size="sm" variant="outline">
                              Play
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => setShowPricing(true)}
                            >
                              <Lock className="w-3 h-3 mr-1" />
                              Unlock
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>
                    Complete modules to track your learning journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{enrolledModules.length}</div>
                      <div className="text-sm text-gray-600">Modules Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{course.modules.length - enrolledModules.length}</div>
                      <div className="text-sm text-gray-600">Modules Remaining</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {enrolledModules.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {enrolledModules.map((moduleIndex) => (
                        <div key={moduleIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700">
                            Completed: {course.modules[moduleIndex]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};
