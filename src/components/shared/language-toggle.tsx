'use client';

import { Globe } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useLangStore } from '@/store/use-lang-store';

const LanguageToggle = () => {
  const { lang, setLang } = useLangStore(state => ({
    lang: state.lang,
    setLang: state.setLang,
  }));

  const { i18n } = useTranslation();

  const handleToggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <Globe className='h-5 w-5' />
          {lang === 'ko' ? 'KR' : 'EN'}
          <span className='sr-only'>Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          className={cn(lang === 'ko' && 'bg-muted')}
          onClick={handleToggleLanguage}
        >
          KR
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(lang === 'en' && 'bg-muted')}
          onClick={handleToggleLanguage}
        >
          EN
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
