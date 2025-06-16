
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Lock, Eye } from "lucide-react";

interface RealmTransitionProps {
  currentRealm: string;
  nextRealm: string | null;
  progress: number;
  onRealmUnlock: (realmId: string) => void;
}

const RealmTransition = ({ currentRealm, nextRealm, progress, onRealmUnlock }: RealmTransitionProps) => {
  const [showTransition, setShowTransition] = useState(false);
  const [mysteryRevealed, setMysteryRevealed] = useState(false);

  useEffect(() => {
    if (progress >= 100 && nextRealm && !mysteryRevealed) {
      setShowTransition(true);
      setTimeout(() => {
        setMysteryRevealed(true);
        onRealmUnlock(nextRealm);
      }, 2000);
    }
  }, [progress, nextRealm, mysteryRevealed, onRealmUnlock]);

  const getMysteryHint = (realmId: string) => {
    const hints = {
      'life-mastery': "The mountains whisper of practical wisdom...",
      'elite-skills': "Ancient towers hold secrets of advanced knowledge...",
      'mastery': "The final sanctuary awaits true masters..."
    };
    return hints[realmId] || "Unknown realm ahead...";
  };

  if (!nextRealm) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {showTransition && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in pointer-events-auto">
          <div className="flex items-center justify-center h-full">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white max-w-md mx-4">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Realm Mastered!</h3>
                  <p className="text-white/80">You have conquered the {currentRealm}</p>
                </div>

                {mysteryRevealed ? (
                  <div className="space-y-3 animate-scale-in">
                    <div className="flex items-center justify-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span className="font-semibold">New Realm Revealed</span>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">
                      {nextRealm} Unlocked
                    </Badge>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-yellow-400">
                      <Lock className="w-5 h-5" />
                      <span className="font-semibold">Mystery Awaits</span>
                    </div>
                    <p className="text-sm text-white/70 italic">
                      {getMysteryHint(nextRealm)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Progress towards next realm hint */}
      {progress > 75 && progress < 100 && !showTransition && (
        <div className="absolute bottom-8 right-8 pointer-events-auto">
          <Card className="bg-black/50 backdrop-blur-sm border-yellow-500/30 text-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-medium">Something stirs ahead...</p>
                  <p className="text-xs text-white/70">{getMysteryHint(nextRealm)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RealmTransition;
