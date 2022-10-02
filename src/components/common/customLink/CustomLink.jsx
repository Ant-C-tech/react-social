import './customLink.css';

import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export const CustomLink = ({
  type,
  content,
  href,
  modification,
  target = '_blank',
}) => {
  let resolved = useResolvedPath(href);
  let match = useMatch({ path: resolved.pathname, end: true });

  return type === 'external' ? (
    <a
      className={`link ${modification}`}
      href={href}
      target={target}
      rel='noopener noreferrer'
    >
      {content}
    </a>
  ) : (
    <Link className={`link ${modification} ${match ? 'active' : ''}`} to={href}>
      {content}
    </Link>
  );
};
