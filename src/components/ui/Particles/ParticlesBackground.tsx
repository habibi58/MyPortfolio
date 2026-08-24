import Particles, { type ParticlesProps } from './Particles';

type ParticlesBackgroundProps = ParticlesProps & {
  overlayClassName?: string;
};

/**
 * Full-bleed Particles layer (React Bits pattern).
 * Parent must be `position: relative` with a defined height (e.g. min-h-screen).
 */
export const ParticlesBackground = ({
  overlayClassName = '',
  className = '',
  ...particlesProps
}: ParticlesBackgroundProps) => {
  return (
    <div className="particles-background absolute inset-0 w-full h-full" aria-hidden>
      <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        <Particles className={className} {...particlesProps} />
      </div>
      {overlayClassName ? (
        <div className={`pointer-events-none absolute inset-0 ${overlayClassName}`} />
      ) : null}
    </div>
  );
};
