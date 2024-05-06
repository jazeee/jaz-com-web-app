import { forwardRef } from 'react';
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from 'react-router-dom';

// See https://reactjs.org/docs/forwarding-refs.html
export const BaseLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => {
    return <RouterLink ref={ref} {...props} />;
  },
);

BaseLink.displayName = 'BaseLink';
