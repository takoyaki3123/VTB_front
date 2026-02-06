'use client';
import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes } from 'react';

export type NextLinkProps = Omit<LinkProps, 'href'> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const NextLink = ({ href, className, ...props }: NextLinkProps) => (
  <Link {...props} href={href || '#'} className={className}>
    {props.children}
  </Link>
);

export default NextLink;
