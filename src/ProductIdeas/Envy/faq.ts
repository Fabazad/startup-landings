import { RawFAQ } from 'src/types/ProductIdea';
import { generalFAQPage } from './faqs/general';
import { listsManagementFAQPage } from './faqs/listManagement';
import { wishesManagementFAQPage } from './faqs/wishManagement';
import { sharingReservationFAQPage } from './faqs/sharingReservations';
import { accountSecurityFAQPage } from './faqs/accountSecurity';
import { notificationsFAQPage } from './faqs/notifications';

export const faq: RawFAQ = {
  pages: [
    generalFAQPage,
    listsManagementFAQPage,
    wishesManagementFAQPage,
    sharingReservationFAQPage,
    accountSecurityFAQPage,
    notificationsFAQPage,
  ],
};
