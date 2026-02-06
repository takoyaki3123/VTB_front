import * as React from 'react';

import { cn } from '@/_libs/utils';

const List = ({ className, ...props }: React.ComponentProps<'ul'>) => {
  return (
    <ul
      data-slot="ul"
      className={cn('text-body max-w-md space-y-1', 'list-none', className)}
      {...props}
    />
  );
};

const ListItem = ({ className, ...props }: React.ComponentProps<'li'>) => {
  return (
    <li
      data-slot="li"
      className={cn('md:inline-flex md:mx-1', className)}
      {...props}
    ></li>
  );
};

export { List, ListItem };
