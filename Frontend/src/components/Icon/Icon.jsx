import Icons from '../../assets/svg/icons.svg';

export const Icon = ({ id, size, className, fill, stroke, color }) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      fill={fill}
      stroke={stroke}
      style={{ color }}
    >
      <use href={`${Icons}#icon-${id}`} />
    </svg>
  );
};
