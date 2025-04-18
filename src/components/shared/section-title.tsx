import { useTranslation } from 'react-i18next';
import { RxCross2 } from 'react-icons/rx';

import { aboutMenuKoMap } from '@/constants/about';
import type { Menu } from '@/types/about';

type Props = {
  text: string;
};

const SectionTitle = ({ text }: Props) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <div className='hidden h-14 items-center justify-between border-b border-slate-400 lg:flex dark:border-slate-700'>
      <div className='flex h-14 w-60 items-center justify-between border-r border-slate-400 px-6 dark:border-slate-700'>
        <span className='slate-700 dark:slate-500 text-body-md'>
          {language === 'ko' ? aboutMenuKoMap[text as Menu] : text}
        </span>
        <RxCross2 className='h-4 w-4 text-slate-500' />
      </div>
    </div>
  );
};

export default SectionTitle;
