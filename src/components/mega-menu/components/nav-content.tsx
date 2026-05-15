import Masonry from '@mui/lab/Masonry';
import Divider from '@mui/material/Divider';
import dynamic from 'next/dynamic';

import { MenuTags } from './menu-tags';
import { NavSubList } from './nav-sub-list';
import { MenuMoreLink } from './menu-more-link';
import { NavUl } from '../../nav-section/styles';
import { navSectionClasses } from '../../nav-section/classes';

import type { NavListProps } from '../types';

// `MenuCarousel` pulls in <Image /> (react-lazy-load-image-component + its
// render-blocking CSS) plus embla-carousel. The carousel is only rendered when
// a menu entry declares `slides`, which the landing nav never does -- so
// defer it so landing visitors don't pay for embla + LazyLoadImage upfront.
const MenuCarousel = dynamic(() => import('./menu-carousel').then((m) => m.MenuCarousel), {
  ssr: false,
});

// ----------------------------------------------------------------------

export function NavContent({
  data,
  slotProps,
  singleList,
}: NavListProps & {
  singleList: boolean;
}) {
  if (!data.children) {
    return null;
  }

  if (singleList) {
    return (
      <NavUl>
        <NavSubList data={data.children} slotProps={slotProps} />
      </NavUl>
    );
  }

  return (
    <>
      <Masonry
        component="ul"
        className={navSectionClasses.ul}
        columns={4}
        defaultColumns={4}
        spacing={3}
        defaultSpacing={3}
        sx={{ p: 0 }}
      >
        <NavSubList data={data.children} slotProps={slotProps} />
      </Masonry>

      {!!data.moreLink && (
        <MenuMoreLink
          path={data.moreLink.path}
          title={data.moreLink.title}
          sx={slotProps?.moreLink}
        />
      )}

      {!!data.slides && (
        <>
          <Divider sx={{ borderStyle: 'dashed', my: 3 }} />
          <MenuCarousel
            slides={data.slides}
            displayCount={slotProps?.carousel?.displayCount}
            sx={slotProps?.carousel?.sx}
          />
        </>
      )}

      {!!data.tags && (
        <>
          <Divider sx={{ borderStyle: 'dashed', my: 3 }} />
          <MenuTags tags={data.tags} sx={slotProps?.tags} />
        </>
      )}
    </>
  );
}
