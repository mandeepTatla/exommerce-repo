import { useWindowSize } from './useWindowSize';

export const useProject = () => {
  const { innerWidth } = useWindowSize();

  return {
    isDesktop: innerWidth >= 1024,
    isMobile: innerWidth <= 767
  };
};
