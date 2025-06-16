
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Send } from "lucide-react";

interface SuccessStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (story: any) => void;
}

export const SuccessStoryModal = ({ isOpen, onClose, onSubmit }: SuccessStoryModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    story: "",
    skill: "",
    outcome: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.story && formData.skill && formData.outcome) {
      onSubmit(formData);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({ name: "", story: "", skill: "", outcome: "" });
      }, 2000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white flex items-center justify-center gap-2">
            <Star className="w-8 h-8 text-yellow-400" />
            Share Your Success Story
          </DialogTitle>
        </DialogHeader>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-blue-100">
                Inspire others by sharing how Livante Growth Lab transformed your life. Your story could be the motivation someone needs!
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white font-semibold">Your Name (e.g., "Sarah, 23")</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your name and age"
                  className="bg-white/10 border-white/30 text-white placeholder:text-gray-300"
                  required
                />
              </div>

              <div>
                <Label htmlFor="story" className="text-white font-semibold">Your Success Story</Label>
                <Textarea
                  id="story"
                  value={formData.story}
                  onChange={(e) => handleChange("story", e.target.value)}
                  placeholder="Tell us about your journey and achievement..."
                  className="bg-white/10 border-white/30 text-white placeholder:text-gray-300 min-h-[100px]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="skill" className="text-white font-semibold">Skill Mastered</Label>
                <Input
                  id="skill"
                  value={formData.skill}
                  onChange={(e) => handleChange("skill", e.target.value)}
                  placeholder="e.g., Communication Mastery, Financial Literacy"
                  className="bg-white/10 border-white/30 text-white placeholder:text-gray-300"
                  required
                />
              </div>

              <div>
                <Label htmlFor="outcome" className="text-white font-semibold">Achievement/Outcome</Label>
                <Input
                  id="outcome"
                  value={formData.outcome}
                  onChange={(e) => handleChange("outcome", e.target.value)}
                  placeholder="e.g., 40% salary increase, Promoted to manager"
                  className="bg-white/10 border-white/30 text-white placeholder:text-gray-300"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-white/30 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Share My Story
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Thank You!</h3>
            <p className="text-blue-100">
              Your success story has been shared and will inspire others on their journey!
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
