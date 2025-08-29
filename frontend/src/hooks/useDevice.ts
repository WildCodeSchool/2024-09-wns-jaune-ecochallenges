import { useWindowSize } from './useWindowsSize';

export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1280,
};
export type Device = 'mobile' | 'tablet' | 'desktop';

type UseDeviceOutput = {
  currentDevice: Device;
  currentWidth?: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  /**
   * Indicates if the device information is ready.
   * This is useful to avoid wrong rendering issues before the device type is determined.
   * For example, prevent to display desktop-specific components on initial render when the window size is not yet available.
   */
  isReady: boolean;
};

export function useDevice(): UseDeviceOutput {
  const { width } = useWindowSize();
  let currentDevice: Device = 'desktop';
  if (width && width <= BREAKPOINTS.MOBILE) {
    currentDevice = 'mobile';
  } else if (width && width <= BREAKPOINTS.TABLET) {
    currentDevice = 'tablet';
  }

  return {
    currentWidth: width,
    currentDevice,
    isMobile: currentDevice === 'mobile',
    isTablet: currentDevice === 'tablet',
    isDesktop: currentDevice === 'desktop',
    isReady: typeof window !== 'undefined',
  };
}
