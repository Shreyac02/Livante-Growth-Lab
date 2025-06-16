
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Mail, Calendar, Globe } from "lucide-react";

const weeklyNewsletters = [
  {
    week: "This Week",
    title: "Elite Mindset: Lessons from Warren Buffett's Latest Shareholder Meeting",
    preview: "How the Oracle of Omaha thinks about modern challenges and opportunities...",
    topics: ["Investment Psychology", "Decision Making", "Long-term Thinking"]
  },
  {
    week: "Last Week", 
    title: "The Art of Networking: Inside Silicon Valley's Most Exclusive Events",
    preview: "What we learned from TED's private mastermind sessions...",
    topics: ["Strategic Networking", "Innovation Mindset", "Future Technologies"]
  },
  {
    week: "2 Weeks Ago",
    title: "Leadership Secrets from Global CEOs",
    preview: "Exclusive insights from Fortune 500 boardrooms...",
    topics: ["Executive Presence", "Team Dynamics", "Strategic Vision"]
  }
];

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal = ({ isOpen, onClose }: NewsletterModalProps) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        onClose();
        setSubscribed(false);
        setEmail("");
      }, 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white flex items-center justify-center gap-2">
            <Crown className="w-8 h-8 text-yellow-400" />
            Join the Elite Newsletter
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-blue-100 text-lg">
              Get weekly insights from billionaire clubs, exclusive society events, and elite circles worldwide.
            </p>
            <Badge className="mt-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
              Updated Every Sunday
            </Badge>
          </div>

          {!subscribed ? (
            <>
              <div className="grid md:grid-cols-3 gap-4">
                {weeklyNewsletters.map((newsletter, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-200">
                          {newsletter.week}
                        </Badge>
                        <Calendar className="w-4 h-4 text-blue-300" />
                      </div>
                      <CardTitle className="text-lg text-white">{newsletter.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-100 text-sm mb-3">{newsletter.preview}</p>
                      <div className="space-y-1">
                        {newsletter.topics.map((topic, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs mr-1 border-white/30 text-white">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col items-center space-y-4 bg-white/5 rounded-xl p-6">
                <div className="flex items-center space-x-2 text-emerald-400">
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">Subscribe for Exclusive Access</span>
                </div>
                <div className="flex w-full max-w-md space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-300"
                  />
                  <Button
                    onClick={handleSubscribe}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-blue-200 text-center">
                  Join 50,000+ elite subscribers • No spam, unsubscribe anytime
                </p>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Welcome to the Elite!</h3>
              <p className="text-blue-100">
                Check your email for your first exclusive newsletter. You'll receive weekly updates every Sunday.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
