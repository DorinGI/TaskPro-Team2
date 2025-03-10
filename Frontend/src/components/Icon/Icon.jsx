import PropTypes from 'prop-types';
import Icons from '../../assets/svg/icons.svg';

export const Icon = ({
  id,
  size = 24,
  className = '',
  fill = 'currentColor',
  stroke = 'none',
  color = 'inherit',
}) => (
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

Icon.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  color: PropTypes.string,
};