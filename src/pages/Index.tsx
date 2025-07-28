import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SpinWheel } from '@/components/SpinWheel';
import { RewardModal } from '@/components/RewardModal';
import { cn } from '@/lib/utils';

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lastReward, setLastReward] = useState('');

  const handleSpin = (result: string) => {
    setIsSpinning(false);
    setLastReward(result);
    setShowModal(true);
  };

  const startSpin = () => {
    setIsSpinning(true);
  };

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `url('/lovable-uploads/b9e13d1e-2884-4da5-aabd-d07c17c845d5.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
      
      {/* Connect Wallet Button */}
      <div className="absolute top-6 right-6 z-10">
        <Button 
          variant="outline" 
          className={cn(
            "bg-white/10 backdrop-blur-md border-white/20 text-white",
            "hover:bg-white/20 hover:border-white/30",
            "font-medium px-6 py-2 rounded-lg shadow-lg",
            "transition-all duration-200"
          )}
        >
          Connect Wallet
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Spin to Win
          </h1>
          <p className="text-lg md:text-xl text-white/90 drop-shadow-lg max-w-md mx-auto">
            Try your luck and win amazing rewards including whitelist spots!
          </p>
        </div>

        {/* Spin Wheel */}
        <div className="mb-8">
          <SpinWheel onSpin={handleSpin} isSpinning={isSpinning} />
        </div>

        {/* Additional Info */}
        <div className="text-center text-white/80 text-sm max-w-sm mx-auto">
          <p className="drop-shadow-lg">
            Each spin gives you a chance to win whitelist spots, extra spins, or other exciting rewards!
          </p>
        </div>
      </div>

      {/* Reward Modal */}
      <RewardModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        reward={lastReward}
      />
    </div>
  );
};

export default Index;
