'use client';

import { Box, CircularProgress, Dialog } from '@mui/material';
import { SubscriptionEmailForm } from './subscriptionEmailForm';
import { SubscriptionFeaturesForm } from './SubscriptionFeaturesForm/subscriptionFeaturesForm';
import { SubscriptionSuccess } from './subscriptionSuccess';
import { SubscriptionStep, useSubscription } from './subscription-context';

export default function SubscriptionModalView() {
    const { openModal, subscriptionStep, isFirstFetching } = useSubscription();

    return (
        <Dialog open={openModal} fullWidth maxWidth="md">
            {isFirstFetching && (
                <Box
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}
                >
                    <CircularProgress />
                </Box>
            )}
            {!isFirstFetching && (
                <>
                    {subscriptionStep === SubscriptionStep.SUBSCRIBE_EMAIL && <SubscriptionEmailForm />}
                    {subscriptionStep === SubscriptionStep.SUBSCRIBE_FEATURES && <SubscriptionFeaturesForm />}
                    {subscriptionStep === SubscriptionStep.SUCCESS && <SubscriptionSuccess />}
                </>
            )}
        </Dialog>
    );
}
