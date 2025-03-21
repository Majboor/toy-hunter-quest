
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Online Shopper",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      quote: "ProductFinder helped me discover amazing boutique clothing stores I never would have found otherwise. The category and location filters made my shopping experience so much easier!"
    },
    {
      name: "David Chen",
      role: "Tech Enthusiast",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      quote: "I was looking for specific electronic gadgets and ProductFinder connected me with specialized Shopify stores that had exactly what I needed. Incredible time-saver!"
    },
    {
      name: "Emily Rodriguez",
      role: "Home Decorator",
      image: "https://randomuser.me/api/portraits/women/67.jpg",
      quote: "As an interior designer, I'm always looking for unique home decor items. This platform has been invaluable for finding specialty stores with one-of-a-kind pieces."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">What our users say</h2>
        <p className="text-lg text-muted-foreground">
          Don't just take our word for it – here's what shoppers like you have experienced with ProductFinder.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="flex flex-col p-6 rounded-xl border border-border bg-background shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <p className="text-muted-foreground flex-1 mb-6 italic">"{testimonial.quote}"</p>
            
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
