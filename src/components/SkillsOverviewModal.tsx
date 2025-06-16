
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, Target, Users, DollarSign, Brain, Heart, Briefcase } from "lucide-react";

const skillsOverview = [
  {
    category: "Financial Mastery",
    icon: <DollarSign className="w-8 h-8 text-green-400" />,
    realLifeExample: "Sarah learned budgeting and investing. Now she owns 3 rental properties at age 25.",
    careerImpact: "Finance roles, entrepreneurship, personal wealth building",
    skills: ["Tax filing", "Investment planning", "Budget management", "Credit optimization"],
    potentialOutcome: "Average of $50k+ increase in net worth within 2 years"
  },
  {
    category: "Communication Excellence", 
    icon: <Users className="w-8 h-8 text-blue-400" />,
    realLifeExample: "Alex mastered public speaking. Went from shy intern to leading 200-person presentations.",
    careerImpact: "Leadership roles, sales, management, entrepreneurship",
    skills: ["Public speaking", "Negotiation", "Social etiquette", "Emotional intelligence"],
    potentialOutcome: "Leadership positions and 40% higher salary potential"
  },
  {
    category: "Practical Life Skills",
    icon: <Target className="w-8 h-8 text-purple-400" />,
    realLifeExample: "Maya learned home repairs and cooking. Saves $15k/year and feels completely independent.",
    careerImpact: "Self-reliance, problem-solving mindset, resourcefulness",
    skills: ["Home maintenance", "Cooking", "Digital literacy", "Style & grooming"],
    potentialOutcome: "Save $10k+ annually while building confidence"
  },
  {
    category: "Mental & Emotional Intelligence",
    icon: <Brain className="w-8 h-8 text-pink-400" />,
    realLifeExample: "David learned stress management and psychology. Became the most effective team leader at his company.",
    careerImpact: "Any leadership role, therapy, coaching, human resources",
    skills: ["Stress management", "Psychology basics", "Self-defense", "Emotional regulation"],
    potentialOutcome: "Better relationships and 60% less stress-related issues"
  }
];

interface SkillsOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SkillsOverviewModal = ({ isOpen, onClose }: SkillsOverviewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-white/20 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-white flex items-center justify-center gap-2">
            <Lightbulb className="w-10 h-10 text-yellow-400" />
            Skills That Transform Lives
          </DialogTitle>
          <p className="text-center text-blue-100 text-lg mt-2">
            See exactly how these skills can change your career and life trajectory
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {skillsOverview.map((category, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    {category.icon}
                    <CardTitle className="text-xl text-white">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <h4 className="font-semibold text-green-400 mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Real Success Story
                    </h4>
                    <p className="text-green-100 text-sm">{category.realLifeExample}</p>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <h4 className="font-semibold text-blue-400 mb-2 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Career Applications
                    </h4>
                    <p className="text-blue-100 text-sm">{category.careerImpact}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-2">Key Skills Included:</h4>
                    <div className="flex flex-wrap gap-1">
                      {category.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-white/30 text-white">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                    <h4 className="font-semibold text-purple-400 mb-2 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Expected Outcome
                    </h4>
                    <p className="text-purple-100 text-sm font-medium">{category.potentialOutcome}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-Beige-200/20 to-red-500/20 border-orange-500/30 text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">The Compound Effect</h3>
              <p className="text-orange-100 text-lg mb-4">
                When you master multiple skill categories, the results multiply exponentially. Our kids who complete 3+ categories report:
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-400">85%</div>
                  <p className="text-sm text-yellow-100">Career advancement within 1 year</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-400">$75k+</div>
                  <p className="text-sm text-green-100">Average income increase</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-400">95%</div>
                  <p className="text-sm text-blue-100">Report feeling "life-ready"</p>
                </div>
              </div>
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 text-lg"
              >
                Start Your Transformation
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
