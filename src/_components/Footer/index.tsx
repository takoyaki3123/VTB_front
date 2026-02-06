import { cn } from '@/_libs/utils';
import React from 'react';

const FooterContainer = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return <div className={cn('h-40 w-full flex', className)} {...props} />;
};

const FooterContentContainer = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('mx-0 w-full h-full flex md:mx-8', className)}
      {...props}
    />
  );
};

export const Footer = () => {
  return (
    <FooterContainer className="bg-gray-300 mt-4">
      <FooterContentContainer className="bg-gray-600"></FooterContentContainer>
    </FooterContainer>
  );
};
