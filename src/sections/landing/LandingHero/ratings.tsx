import { Avatar, AvatarGroup, Box, avatarClasses } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { _mock } from 'src/_mock';
import { AnimatedDiv } from './animated-div';

export const Ratings = () => {
  const { t } = useTranslation();
  return (
    <AnimatedDiv>
      <Box
        gap={1.5}
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        sx={{ typography: 'subtitle2' }}
      >
        <AvatarGroup sx={{ [`& .${avatarClasses.root}`]: { width: 32, height: 32 } }}>
          {[...Array(3)].map((_, index) => (
            <Avatar
              key={_mock.fullName(index + 1)}
              alt={_mock.fullName(index + 1)}
              src={_mock.image.avatar(index + 1)}
            />
          ))}
        </AvatarGroup>
        {t('landing.hero.ratings')}
      </Box>
    </AnimatedDiv>
  );
};
