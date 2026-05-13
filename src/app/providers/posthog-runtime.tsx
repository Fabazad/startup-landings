'use client';

import { PostHogProvider as PHProvider } from 'posthog-js/react';
import PostHogPageView from './posthog-page-view';

type Props = {
  client: any;
  children: React.ReactNode;
};

export default function PostHogRuntime({ client, children }: Props) {
  return (
    <PHProvider client={client}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
