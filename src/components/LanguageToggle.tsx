import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export type Language = 'en' | 'hi';

interface LanguageToggleProps {
  onLanguageChange?: (lang: Language) => void;
}

export const LanguageToggle = ({ onLanguageChange }: LanguageToggleProps) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    const newLang: Language = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    onLanguageChange?.(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="relative transition-all duration-200"
      aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
    >
      <Languages className="h-5 w-5 mr-2" />
      <span className="font-medium">{language === 'en' ? 'EN' : 'हिं'}</span>
    </Button>
  );
};

export default LanguageToggle;