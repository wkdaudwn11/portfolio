import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { navLinks } from '@/constants/header';
import { useProjectsPageStore } from '@/store/use-projects-page-store';

import MenuItem from './menu-item';

const accordionTitle = navLinks.find(item => item.href === '/projects')?.label || '_projects';

const SidebarContent = () => {
  const { techs } = useProjectsPageStore(state => ({
    techs: state.techs,
  }));

  return (
    <>
      <div className='block px-6 lg:hidden'>
        <Accordion type='single' collapsible className='flex w-full flex-col gap-1 sm:flex-row'>
          <AccordionItem value='projects' className='flex-1'>
            <AccordionTrigger className='rounded-none bg-gray-300 px-4 dark:bg-slate-700'>
              {accordionTitle}
            </AccordionTrigger>
            <AccordionContent className='border border-gray-300 pb-0 dark:border-slate-700'>
              {techs.map(menu => (
                <MenuItem key={menu} menu={menu} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className='hidden space-y-1 px-6 py-5 lg:block'>
        {techs.map(menu => (
          <MenuItem key={menu} menu={menu} />
        ))}
      </div>
    </>
  );
};
export default SidebarContent;
