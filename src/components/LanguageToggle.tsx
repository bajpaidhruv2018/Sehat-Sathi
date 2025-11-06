import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="relative transition-all duration-300 hover:scale-105"
      aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
    >
      <span className="text-xl mr-2">{language === 'en' ? '🇬🇧' : '🇮🇳'}</span>
      <Languages className="h-4 w-4 mr-1" />
      <span className="font-medium">{language === 'en' ? 'EN' : 'हिं'}</span>
    </Button>
  );
};

export default LanguageToggle;