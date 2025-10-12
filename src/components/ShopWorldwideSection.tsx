import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ShopWorldwideSectionProps {
  onGetStartedClick?: () => void;
}

export function ShopWorldwideSection({ onGetStartedClick }: ShopWorldwideSectionProps) {
  return (
    <section className="bg-[#1e3a5f] text-white py-20 px-4 relative overflow-hidden">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-dashed border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-dashed border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-dashed border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl mb-6">
              Shop from India
              <br />
              and Ship Worldwide
            </h2>
            <p className="text-xl mb-8">
              Get access to Indian shopping from anywhere across the globe with shipping rates as low as ₹ 1400/-
            </p>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6"
              onClick={onGetStartedClick}
            >
              Get Started
            </Button>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1759648301835-a0ccd345a417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYW1pbHklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NTk3NTYyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Indian Family Shopping" 
                className="w-full h-auto max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
