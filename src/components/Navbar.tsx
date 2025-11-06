import { Link, useLocation } from "react-router-dom";
import { Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.education'), path: "/education" },
    { name: t('nav.healthcare'), path: "/healthcare" },
    { name: t('nav.literacy'), path: "/literacy" },
    { name: t('nav.misconceptions'), path: "/misconceptions", special: true },
    { name: t('nav.emergency'), path: "/emergency" },
    { name: t('nav.dashboard'), path: "/dashboard" },
    { name: t('nav.askDoctor'), path: "/ask-doctor" },
    { name: t('nav.locator'), path: "/locator" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-full bg-gradient-primary p-2">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">HealthConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? "default" : "ghost"}
                size="sm"
                className={`font-medium transition-all duration-300 ${
                  item.special
                    ? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105 animate-pulse-slow border-2 border-transparent hover:border-primary/50"
                    : ""
                }`}
              >
                {item.name}
                {item.special && <span className="ml-1 text-xs">✨</span>}
              </Button>
            </Link>
          ))}
          <LanguageToggle />
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          <SheetContent>
            <div className="mt-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={location.pathname === item.path ? "default" : "ghost"}
                    className={`w-full justify-start text-lg transition-all duration-300 ${
                      item.special
                        ? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg border-2 border-transparent hover:border-primary/50"
                        : ""
                    }`}
                  >
                    {item.name}
                    {item.special && <span className="ml-2">✨</span>}
                  </Button>
                </Link>
              ))}
            </div>
          </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
