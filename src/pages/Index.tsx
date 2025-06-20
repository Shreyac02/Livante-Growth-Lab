import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award, PlayCircle, Quote, Target, Zap, TrendingUp, Star, Brain, Heart, Lightbulb, Globe, Trophy, CheckCircle, Send, X } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";
import { UserMenu } from "@/components/UserMenu";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NewsletterModal } from "@/components/NewsletterModal";
import { SuccessStoryModal } from "@/components/SuccessStoryModal";
import { SkillsOverviewModal } from "@/components/SkillsOverviewModal";
import Courses from "./Courses";
import type { AuthUser } from "@/lib/auth";

const motivationalQuotes = [
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  },
  {
    text: "Learning never exhausts the mind.",
    author: " Leonardo da Vinci"
  },
  {
    text: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.",
    author: "Abigail Adams"
  },
  {
    text: "It's what you learn after you know it all that counts.",
    author: "John Wooden"
  },
  {
    text: "The more I read, the more I acquire, the more certain I am that I know nothing.",
    author: "Voltair"
  },
  {
    text: "The only person who is educated is the one who has learned how to learn and change.",
    author: "Carl Rogers"
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"
  },
  {
    text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.",
    author: "Albert Einstein"
  },
  {
    text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
    author: "Brian Herbert"
  }
];

const realWorldStats = [
  { number: "85%", text: "of career success comes from soft skills", source: "Harvard Research" },
  { number: "70%", text: "of employers say life skills are more important than technical skills", source: "LinkedIn Survey" },
  { number: "90%", text: "of top performers have high emotional intelligence", source: "TalentSmart Study" }
];

const successStories = [
  {
    name: "Sarah, 23",
    story: "Landed her dream job after mastering communication skills",
    skill: "Communication Mastery",
    outcome: "40% salary increase"
  },
  {
    name: "Alex, 25",
    story: "Started a successful business using financial planning skills",
    skill: "Financial Literacy",
    outcome: "Founded startup"
  },
  {
    name: "Maya, 22",
    story: "Became team leader through people management training",
    skill: "Leadership",
    outcome: "Promoted to manager"
  }
];

interface IndexProps {
  user: AuthUser | null;
}

const Index = ({ user }: IndexProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [showSuccessStoryModal, setShowSuccessStoryModal] = useState(false);
  const [showSkillsOverviewModal, setShowSkillsOverviewModal] = useState(false);
  const [userSuccessStories, setUserSuccessStories] = useState([]);

  const currentQuote = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  }, []);

  const handleSectionChange = useCallback((section: string) => {
    setCurrentSection(section);
  }, []);

  const handleAddSuccessStory = (story) => {
    setUserSuccessStories(prev => [...prev, story]);
  };

  const renderHomeSection = () => (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/10">
            <Quote className="w-12 h-12 text-blue-300 mx-auto mb-4 opacity-70" />
            <blockquote className="text-2xl md:text-3xl font-light text-white mb-4 italic leading-relaxed">
              "{currentQuote.text}"
            </blockquote>
            <cite className="text-blue-200 text-lg">— {currentQuote.author}</cite>
          </div>

          <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Real-World Skills</span>
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto drop-shadow-md">
            The essential life skills bootcamp that schools forgot to teach. Level up your real-world abilities and unlock your full potential.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center mb-8">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Users className="w-5 h-5 text-blue-300" />
              <span className="text-white">200k+ Students</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Award className="w-5 h-5 text-blue-300" />
              <span className="text-white">15 Skill Tracks</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <PlayCircle className="w-5 h-5 text-blue-300" />
              <span className="text-white">100+ Video Lessons</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg px-8 py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              onClick={() => handleSectionChange('courses')}
            >
              Start Your Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm text-lg px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-200"
              onClick={() => handleSectionChange('courses')}
            >
              🎮 Challenge Me!
            </Button>
          </div>
        </div>
      </section>

      {/* Real World Impact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-900/30 via-blue-900/30 to-purple-900/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Globe className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-6">Real World. Real Impact. Real Results.</h3>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              While others are still figuring out taxes, you'll be mastering life. These aren't just courses - they're your competitive advantage in the real world.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {realWorldStats.map((stat, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-emerald-400 mb-2">{stat.number}</div>
                <p className="text-white font-semibold mb-2">{stat.text}</p>
                <Badge variant="secondary" className="bg-white/20 text-blue-200">{stat.source}</Badge>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              onClick={() => setShowNewsletterModal(true)}
            >
              <Trophy className="w-5 h-5 mr-2" />
              Join the Elite Newsletter
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Heart className="w-16 h-16 text-pink-400 mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-6">Success Stories That Inspire</h3>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Real people, real transformations. See how mastering life skills changed everything for our students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[...successStories, ...userSuccessStories].map((story, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 text-white transform hover:scale-105 transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-lg text-white">{story.name}</CardTitle>
                    <Badge className="bg-gradient-to-r from-pink-500 to-rose-500">{story.outcome}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-4">"{story.story}"</p>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-green-300">Mastered: {story.skill}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              onClick={() => setShowSuccessStoryModal(true)}
            >
              <Star className="w-5 h-5 mr-2" />
              Write Your Success Story
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Crisis Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-900/30 via-orange-900/30 to-yellow-900/30 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <div className="mb-16">
            <Brain className="w-16 h-16 text-orange-400 mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-6">The Skills Crisis is Real</h3>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-8">
              Schools teach you calculus, but not how to calculate your taxes. You memorize history, but don't know how to manage your emotions. 
              The education system failed to prepare you for the real world. We're here to fix that.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-2xl mb-2">🎓</div>
              <h4 className="text-white font-bold mb-2">Traditional Education</h4>
              <p className="text-orange-200 text-sm">Memorize, Test, Forget</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-2xl mb-2">💼</div>
              <h4 className="text-white font-bold mb-2">Real World</h4>
              <p className="text-orange-200 text-sm">Apply, Adapt, Succeed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-2xl mb-2">🤔</div>
              <h4 className="text-white font-bold mb-2">The Gap</h4>
              <p className="text-orange-200 text-sm">Missing Life Skills</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="text-white font-bold mb-2">Our Solution</h4>
              <p className="text-orange-200 text-sm">Bridge That Gap</p>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            onClick={() => setShowSkillsOverviewModal(true)}
          >
            <Lightbulb className="w-5 h-5 mr-2" />
            Bridge the Gap Now
          </Button>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-16 px-4 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-white mb-16">
            <Zap className="w-10 h-10 inline mr-4 text-yellow-400" />
            WHY These Skills Matter
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-green-400 mb-4" />
                <CardTitle className="text-xl text-white">Career Acceleration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100">
                  Stand out in the job market with practical skills that employers actually value. Real-world abilities that translate to immediate impact.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <CardHeader>
                <Target className="w-12 h-12 text-purple-400 mb-4" />
                <CardTitle className="text-xl text-white">Life Mastery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100">
                  Navigate adult life with confidence. From managing finances to effective communication, master the skills that matter most.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <CardHeader>
                <Star className="w-12 h-12 text-yellow-400 mb-4" />
                <CardTitle className="text-xl text-white">Future-Proofing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100">
                  Adapt to the rapidly changing world with timeless skills and modern knowledge. Stay relevant and thrive in any situation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-white mb-16">
            <BookOpen className="w-10 h-10 inline mr-4 text-blue-400" />
            HOW It Works
          </h3>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center space-x-6 bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">1</div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Choose Your Path</h4>
                <p className="text-blue-100">Select skills based on your level and interests. Our gamified system guides your learning journey.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">2</div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Learn by Doing</h4>
                <p className="text-blue-100">Hands-on projects, real scenarios, and interactive challenges. No boring theory - just practical application.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">3</div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Level Up</h4>
                <p className="text-blue-100">Track your progress, earn achievements, and unlock advanced skills. Build confidence with each milestone.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Because Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-8">
            BECAUSE Your Future Depends On It
          </h3>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            The world is changing fast. Traditional education isn't keeping up. We're here to bridge that gap with skills that actually matter in 2024 and beyond.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
              <p className="text-blue-100">of our graduates feel more confident in their daily lives</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">3x</div>
              <p className="text-blue-100">faster skill acquisition through our gamified approach</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">200k+</div>
              <p className="text-blue-100">students have already leveled up their lives</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <p className="text-blue-100">access to learning materials and community support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderPlansSection = () => (
    <div className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-16">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Free</CardTitle>
              <div className="text-3xl font-bold text-white">$0<span className="text-sm text-blue-200">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-blue-100">
                <li>• Access to 3 courses</li>
                <li>• Basic learning materials</li>
                <li>• Community support</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-gray-500 to-gray-600">Current Plan</Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white ring-2 ring-yellow-400">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Premium</CardTitle>
              <div className="text-3xl font-bold text-white">$19<span className="text-sm text-blue-200">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-blue-100">
                <li>• Access to all courses</li>
                <li>• Interactive challenges</li>
                <li>• Personal progress tracking</li>
                <li>• Priority support</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600">Upgrade Now</Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Pro</CardTitle>
              <div className="text-3xl font-bold text-white">$39<span className="text-sm text-blue-200">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-blue-100">
                <li>• Everything in Premium</li>
                <li>• 1-on-1 mentoring</li>
                <li>• Custom learning paths</li>
                <li>• Certification</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600">Coming Soon</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-16">Get In Touch</h2>
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardContent className="p-8 space-y-6">
              <p className="text-blue-100 text-lg">
                Have questions about our courses or need help getting started? We're here to help you on your learning journey.
              </p>
              <div className="space-y-4">
                <div>
                  <strong className="text-white">Email:</strong>
                  <p className="text-blue-200">hello@Livante.in</p>
                </div>
                <div>
                  <strong className="text-white">Support Hours:</strong>
                  <p className="text-blue-200">Monday - Friday, 9 AM - 6 PM EST</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600">Send Message</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')`
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-pink-900/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-56 h-56 bg-indigo-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg z-20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                  <img 
                    src="/LOGOL copy.png" 
                    alt="Livante Growth Lab Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Livante Growth Lab</h1>
                  <p className="text-sm text-blue-100">Building Foundations for Life</p>
                </div>
              </div>
              
              <NavigationMenu>
                <NavigationMenuList className="space-x-1">
                  <NavigationMenuItem>
                    <Button
                      variant="ghost"
                      className={`text-white hover:bg-white/20 ${currentSection === 'home' ? 'bg-white/20' : ''}`}
                      onClick={() => handleSectionChange('home')}
                    >
                      Home
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button
                      variant="ghost"
                      className={`text-white hover:bg-white/20 ${currentSection === 'courses' ? 'bg-white/20' : ''}`}
                      onClick={() => handleSectionChange('courses')}
                    >
                      Courses
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button
                      variant="ghost"
                      className={`text-white hover:bg-white/20 ${currentSection === 'plans' ? 'bg-white/20' : ''}`}
                      onClick={() => handleSectionChange('plans')}
                    >
                      Plans
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button
                      variant="ghost"
                      className={`text-white hover:bg-white/20 ${currentSection === 'contact' ? 'bg-white/20' : ''}`}
                      onClick={() => handleSectionChange('contact')}
                    >
                      Contact
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    {user.subscription_status === 'free' && (
                      <Button
                        onClick={() => setShowSubscriptionModal(true)}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                      >
                        Upgrade to Premium
                      </Button>
                    )}
                    <UserMenu user={user} />
                  </>
                ) : (
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="pt-20">
          {currentSection === 'home' && renderHomeSection()}
          {currentSection === 'courses' && (
            <Courses 
              user={user} 
              onAuthRequired={() => setShowAuthModal(true)}
              onSubscriptionRequired={() => setShowSubscriptionModal(true)}
            />
          )}
          {currentSection === 'plans' && renderPlansSection()}
          {currentSection === 'contact' && renderContactSection()}
        </main>

        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        )}

        {showSubscriptionModal && user && (
          <SubscriptionModal
            isOpen={showSubscriptionModal}
            onClose={() => setShowSubscriptionModal(false)}
            userId={user.id}
            onSuccess={() => {
              window.location.reload();
            }}
          />
        )}

        <NewsletterModal
          isOpen={showNewsletterModal}
          onClose={() => setShowNewsletterModal(false)}
        />

        <SuccessStoryModal
          isOpen={showSuccessStoryModal}
          onClose={() => setShowSuccessStoryModal(false)}
          onSubmit={handleAddSuccessStory}
        />

        <SkillsOverviewModal
          isOpen={showSkillsOverviewModal}
          onClose={() => setShowSkillsOverviewModal(false)}
        />

        <footer className="bg-black/20 backdrop-blur-lg text-white py-12 px-4 border-t border-white/20">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/LOGOL copy.png" 
                  alt="Livante Growth Lab Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold">Livante Growth Lab</h3>
            </div>
            <p className="text-blue-100 mb-6">
              Forging the skills that matter for the modern world.
            </p>
            <p className="text-blue-200 text-sm">
              © 2024 Livante Growth Lab. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;