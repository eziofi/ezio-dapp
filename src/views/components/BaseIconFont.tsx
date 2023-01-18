import { CSSProperties } from 'react';

const BaseIconFont = ({ name, style }: { name: string; style?: CSSProperties }) => {
  return (
    <svg className="icon" aria-hidden="true" style={{ ...style }}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default BaseIconFont;
