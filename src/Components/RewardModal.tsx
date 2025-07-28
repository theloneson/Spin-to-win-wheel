import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  reward: string;
}

export const RewardModal: React.FC<RewardModalProps> = ({ isOpen, onClose, reward }) => {
  const getRewardDisplay = (reward: string) => {
    switch (reward) {
      case 'WL':
        return {
          title: 'Whitelist Spot!',
          description: 'Congratulations! You\'ve won a whitelist spot.',
          emoji: '🎉'
        };
      case '1x Spin':
        return {
          title: 'Extra Spin!',
          description: 'You\'ve earned an additional spin!',
          emoji: '🎯'
        };
      case 'Try Again':
        return {
          title: 'Try Again',
          description: 'Better luck next time! Give it another spin.',
          emoji: '🔄'
        };
      default:
        return {
          title: reward,
          description: 'You\'ve won a prize!',
          emoji: '🎁'
        };
    }
  };

  const rewardInfo = getRewardDisplay(reward);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader className="text-center space-y-4">
          <div className="text-6xl mx-auto">{rewardInfo.emoji}</div>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {rewardInfo.title}
          </DialogTitle>
          <p className="text-muted-foreground text-lg">
            {rewardInfo.description}
          </p>
        </DialogHeader>
        
        <div className="flex justify-center mt-6">
          <Button 
            onClick={onClose}
            className={cn(
              "px-8 py-3 bg-gradient-to-r from-primary to-primary/80",
              "hover:from-primary/90 hover:to-primary/70",
              "text-primary-foreground font-semibold rounded-lg",
              "shadow-lg hover:shadow-xl transition-all duration-200",
              "transform hover:scale-105"
            )}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};