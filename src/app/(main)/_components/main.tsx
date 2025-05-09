'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdCode } from 'react-icons/md';

import CodeHighlight from '@/components/shared/code-highlight';
import ErrorContent from '@/components/shared/error-content';
import FadeInUp from '@/components/shared/fade-in-up';
import Typewriter from '@/components/shared/typewriter';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import Spinner from '@/components/ui/spinner';
import { Toggle } from '@/components/ui/toggle';
import { fetchHello } from '@/lib/api/hello';
import { cn } from '@/lib/utils';
import type { HelloResponse } from '@/types/hello';
import type { Language } from '@/types/language';

import CodeView from './code-view';
import SnakeGame from './snake-game';

type Props = {
  initialData: HelloResponse;
};

type SkeletonSize = {
  line1: { base: string; sm?: string };
  line2: { base: string; smHeight: string; smWidth: Record<Language, string> };
  line3: { base: string; smHeight: string; smWidth: Record<Language, string> };
};

const SKELETON_SIZES: SkeletonSize = {
  line1: {
    base: 'h-[24px] w-[130px] sm:h-[27px]',
  },
  line2: {
    base: 'h-[46.8px] w-full',
    smHeight: 'sm:h-[66px]',
    smWidth: {
      ko: 'sm:w-[383.41px]',
      en: 'sm:w-[542px]',
    },
  },
  line3: {
    base: 'h-[33.59px] w-[261.61px]',
    smHeight: 'sm:h-[41px]',
    smWidth: {
      ko: 'sm:w-[261.61px]',
      en: 'sm:w-[380px]',
    },
  },
};

const Main = ({ initialData }: Props) => {
  const [isShowCodeHighlight, setIsShowCodeHighlight] = useState(false);

  const {
    i18n: { language },
  } = useTranslation();

  const { data, isFetching, isError } = useQuery({
    queryKey: ['hello', language],
    queryFn: () => fetchHello({ lang: language as Language }),
    initialData,
    enabled: language !== initialData.lang,
    refetchOnMount: process.env.NODE_ENV === 'development',
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const rawCode = useMemo(
    () => `
import { FaGithub, FaEnvelope } from 'react-icons/fa';

const Hello = () => (
  <div className='flex h-[400px] flex-col justify-center gap-4 rounded-xl bg-white p-6 pt-14 shadow-md dark:bg-slate-800'>
    <h4 className='text-heading-h6 sm:text-heading-h5'>${data.code.title}</h4>
    <div className='space-y-4 sm:space-y-2'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
        <FaGithub className='hidden sm:block' />
        <span className='text-body-sm sm:text-body-md'>${data.code.github_text} 👉</span>
        <a
          href="${process.env.NEXT_PUBLIC_GITHUB_URL}"
          target='_blank'
          rel='noopener noreferrer'
        >
          Github
        </a>
      </div>
      <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
        <FaEnvelope className='hidden sm:block' />
        <span className='text-body-sm sm:text-body-md'>${data.code.email_text} 📨</span>
        <a href='mailto:wkdaudwn1028@gmail.com'>
          ${data.code.email_button_text}
        </a>
      </div>
    </div>
    <div className='space-y-1'>
      <p className='text-body-sm text-gray-600 dark:text-gray-300'>${data.code.text01}</p>
      <p className='text-body-sm text-gray-500 italic'>&quot;${data.code.text02}&quot;</p>
    </div>
  </div>
);

export default Hello;
`,
    [data]
  );

  const lines = useMemo(
    () => [
      {
        text: data.text01,
        as: 'p' as const,
        className: 'text-body-md sm:text-body-lg text-gray-600 dark:text-slate-400',
      },
      {
        text: data.name,
        as: 'h1' as const,
        className: 'text-heading-h3 sm:text-heading-h1 text-gray-800 dark:text-slate-050',
      },
      {
        text: `> ${data.text02}`,
        as: 'p' as const,
        className: 'text-heading-h5 sm:text-heading-h4 text-teal-500',
      },
    ],
    [data]
  );

  useEffect(() => {
    setIsShowCodeHighlight(false);
  }, [language]);

  if (isError) {
    return <ErrorContent />;
  }

  return (
    <div
      className={cn(
        'flex h-full flex-col items-center justify-center gap-5 px-4 py-10 xl:gap-8',
        isFetching && 'gap-8'
      )}
    >
      <div className='h-[110px] w-full sm:h-[139px] sm:w-auto'>
        <FadeInUp>
          {isFetching ? (
            <div className='flex flex-col gap-2'>
              <Skeleton className={SKELETON_SIZES.line1.base} />
              <Skeleton
                className={cn(
                  SKELETON_SIZES.line2.base,
                  SKELETON_SIZES.line2.smHeight,
                  SKELETON_SIZES.line2.smWidth[language as Language]
                )}
              />
              <Skeleton
                className={cn(
                  SKELETON_SIZES.line3.base,
                  SKELETON_SIZES.line3.smHeight,
                  SKELETON_SIZES.line3.smWidth[language as Language]
                )}
              />
            </div>
          ) : (
            <Typewriter lines={lines} isLoop />
          )}
        </FadeInUp>
      </div>
      <div className='flex w-full items-center justify-center gap-5 xl:flex-row'>
        <div className={cn('w-full lg:w-fit')}>
          <FadeInUp>
            <div className='relative w-full'>
              {!isFetching && (
                <Toggle
                  aria-label='Toggle italic'
                  className='absolute top-2 right-2 z-10'
                  pressed={isShowCodeHighlight}
                  onPressedChange={() => setIsShowCodeHighlight(prev => !prev)}
                >
                  <MdCode />
                  <Label className='cursor-pointer'>code</Label>
                </Toggle>
              )}
              {isShowCodeHighlight ? (
                <CodeHighlight rawCode={rawCode} loadingClassName='w-full sm:w-[548px]' />
              ) : (
                <CodeView data={data} isFetching={isFetching} language={language as Language} />
              )}
            </div>
          </FadeInUp>
        </div>
        <div className='relative hidden items-center justify-center xl:flex'>
          <FadeInUp>
            {isFetching && (
              <div className='absolute z-10 flex h-full w-full items-center justify-center rounded-xl bg-black/50'>
                <Spinner size='md' />
              </div>
            )}
            <SnakeGame />
          </FadeInUp>
        </div>
      </div>
    </div>
  );
};

export default Main;
