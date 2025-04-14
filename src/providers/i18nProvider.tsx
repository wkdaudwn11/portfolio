'use client';

import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import useMounted from '@/hooks/useMounted';
import i18n from '@/lib/i18n/client';
import { useLangStore } from '@/store/useLangStore';

type Props = {
  children: React.ReactNode;
};

const I18nProvider = ({ children }: Props) => {
  const mounted = useMounted();

  const lang = useLangStore(state => state.lang);
  const setLang = useLangStore(state => state.setLang);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('langStore') || '{}');
    const isPersistLang = stored?.state?.lang;

    if (isPersistLang !== undefined && isPersistLang !== lang) {
      setLang(isPersistLang);
    }
  }, [lang, setLang]);

  useEffect(() => {
    if (mounted) i18n.changeLanguage(lang);
  }, [lang, mounted]);

  if (!mounted) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
