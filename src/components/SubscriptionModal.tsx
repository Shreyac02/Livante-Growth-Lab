import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { upgradeSubscription } from "@/lib/subscription";
import { Crown, Check } from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess: () => void;
}

export const SubscriptionModal = ({ isOpen, onClose, userId, onSuccess }: SubscriptionModalProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await upgradeSubscription(userId);
      toast({
        title: "Subscription upgraded!",
        description: "You now have access to all premium features.",
      });
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: "Error upgrading subscription",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: "Monthly Premium",
      price: "$9.99/month",
      features: [
        "Access to all courses",
        "Interactive exercises",
        "Progress tracking",
        "Achievement system",
        "Priority support",
        "Download resources"
      ]
    },
    {
      name: "Annual Premium",
      price: "$99.99/year",
      features: [
        "All Monthly Premium features",
        "2 months free",
        "Exclusive workshops",
        "1-on-1 mentoring session",
        "Certificate of completion",
        "Early access to new courses"
      ],
      popular: true
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Crown className="h-6 w-6 text-yellow-500" />
            Upgrade to Premium
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-6 ${
                plan.popular ? 'border-blue-500 shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                onClick={handleUpgrade}
                disabled={loading}
              >
                {loading ? "Processing..." : "Choose Plan"}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Secure payment powered by Stripe. Cancel anytime.
        </div>
      </DialogContent>
    </Dialog>
  );
};