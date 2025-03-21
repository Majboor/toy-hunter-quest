
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category, CountryOption } from "@/types";
import { CheckCircle, ChevronRight, Globe, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (category: string, location: string) => void;
}

const categories: Category[] = [
  { id: "1", name: "Clothing", icon: "👕", value: "clothing" },
  { id: "2", name: "Electronics", icon: "🔌", value: "electronics" },
  { id: "3", name: "Home Decor", icon: "🏠", value: "home decor" },
  { id: "4", name: "Toys", icon: "🧸", value: "toys" },
];

const popularCountries: CountryOption[] = [
  { name: "United States", code: "us", flag: "🇺🇸" },
  { name: "United Kingdom", code: "uk", flag: "🇬🇧" },
  { name: "Canada", code: "ca", flag: "🇨🇦" },
  { name: "Australia", code: "au", flag: "🇦🇺" },
  { name: "New Zealand", code: "nz", flag: "🇳🇿" },
  { name: "India", code: "in", flag: "🇮🇳" },
  { name: "Germany", code: "de", flag: "🇩🇪" },
  { name: "France", code: "fr", flag: "🇫🇷" },
  { name: "Japan", code: "jp", flag: "🇯🇵" },
  { name: "Pakistan", code: "pk", flag: "🇵🇰" },
];

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [customCountry, setCustomCountry] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const navigate = useNavigate();

  const filteredCountries = searchQuery 
    ? popularCountries.filter(country => 
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : popularCountries;
  
  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value);
    if (value !== "other") {
      setCustomCategory("");
    }
  };

  const handleCountrySelect = (code: string) => {
    setSelectedCountry(code);
    if (code !== "other") {
      setCustomCountry("");
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (selectedCategory || customCategory) {
        setStep(2);
      }
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleComplete = () => {
    const category = selectedCategory === "other" ? customCategory : selectedCategory;
    const countryCode = selectedCountry === "other" ? customCountry : selectedCountry;
    
    if (category && countryCode) {
      onComplete(category, countryCode);
      onClose();
    }
  };

  const getCategoryValue = () => {
    if (selectedCategory === "other") {
      return customCategory;
    }
    
    const category = categories.find(c => c.id === selectedCategory);
    return category ? category.value : "";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {step === 1 ? "What are you looking for?" : "Where are you located?"}
          </DialogTitle>
        </DialogHeader>
        
        {step === 1 ? (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedCategory === category.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {selectedCategory === category.id && (
                    <span className="absolute right-2 top-2 text-primary">
                      <CheckCircle className="h-5 w-5" />
                    </span>
                  )}
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <span className="text-3xl">{category.icon}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                </div>
              ))}
              
              <div
                className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedCategory === "other"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleCategorySelect("other")}
              >
                {selectedCategory === "other" && (
                  <span className="absolute right-2 top-2 text-primary">
                    <CheckCircle className="h-5 w-5" />
                  </span>
                )}
                <div className="flex flex-col items-center justify-center space-y-2">
                  <span className="text-3xl">🔍</span>
                  <span className="text-sm font-medium">Other</span>
                </div>
              </div>
            </div>
            
            {selectedCategory === "other" && (
              <div className="space-y-2">
                <Label htmlFor="custom-category">Enter product category</Label>
                <Input
                  id="custom-category"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="e.g., Books, Furniture, Beauty"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search countries..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              <RadioGroup
                value={selectedCountry}
                onValueChange={handleCountrySelect}
              >
                {filteredCountries.map((country) => (
                  <div
                    key={country.code}
                    className={`flex items-center space-x-3 rounded-md border p-3 cursor-pointer transition-all ${
                      selectedCountry === country.code
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleCountrySelect(country.code)}
                  >
                    <RadioGroupItem
                      value={country.code}
                      id={country.code}
                      className="sr-only"
                    />
                    <span className="text-lg">{country.flag}</span>
                    <Label
                      htmlFor={country.code}
                      className="flex-1 cursor-pointer font-medium"
                    >
                      {country.name}
                    </Label>
                  </div>
                ))}
                
                <div
                  className={`flex items-center space-x-3 rounded-md border p-3 cursor-pointer transition-all ${
                    selectedCountry === "other"
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleCountrySelect("other")}
                >
                  <RadioGroupItem
                    value="other"
                    id="other-country"
                    className="sr-only"
                  />
                  <span className="text-lg">🌎</span>
                  <Label
                    htmlFor="other-country"
                    className="flex-1 cursor-pointer font-medium"
                  >
                    Other
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {selectedCountry === "other" && (
              <div className="space-y-2">
                <Label htmlFor="custom-country">Enter country code</Label>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="custom-country"
                    value={customCountry}
                    onChange={(e) => setCustomCountry(e.target.value)}
                    placeholder="e.g., mx, br, sg"
                    className="max-w-[120px]"
                    maxLength={2}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter the 2-letter country code (ISO 3166-1 alpha-2)
                </p>
              </div>
            )}
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          {step === 2 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          <Button
            onClick={handleNext}
            disabled={
              (step === 1 && !selectedCategory && !customCategory) ||
              (step === 2 && !selectedCountry && !customCountry) ||
              (step === 1 && selectedCategory === "other" && !customCategory) ||
              (step === 2 && selectedCountry === "other" && !customCountry)
            }
          >
            {step === 2 ? "Complete" : "Next"}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
