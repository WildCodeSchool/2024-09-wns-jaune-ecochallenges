import * as React from 'react';
import { Html, Button } from '@react-email/components';

export interface EmailProps {
  url: string;
}

export function WelcomeEmail(props: EmailProps) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
}
