export function prebootstrap() {
  if (typeof window === 'undefined') {
    return false;
  }

  const windowInstance = window as any;

  windowInstance.bootstraping = true;
  windowInstance.firstSSRRender = true;
}

/**
 * function used inside
 * @param timeout time before firstSSRRender flips to false (default 5000ms)
 */
export function afterbootstrap(timeout?: 5000) {
  if (typeof window === 'undefined') {
    return false;
  }

  const windowInstance = window as any;

  windowInstance.bootstraping = false;

  windowInstance.setTimeout(() => {
    windowInstance.firstSSRRender = false;
  }, timeout);
}
