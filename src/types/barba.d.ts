declare module '@barba/core' {
  export interface ITransitionData {
    current: {
      container: HTMLElement;
      namespace: string;
      url: {
        href: string;
        path: string;
      };
    };
    next: {
      container: HTMLElement;
      namespace: string;
      url: {
        href: string;
        path: string;
      };
    };
    trigger: string;
  }

  interface IBarbaOptions {
    prefix?: string;
    container?: string;
    transitions?: Array<{
      name: string;
      leave?: (data: ITransitionData) => Promise<void> | void;
      enter?: (data: ITransitionData) => Promise<void> | void;
    }>;
    views?: Array<{
      namespace: string;
      beforeEnter?: () => void;
      afterEnter?: () => void;
    }>;
    prevent?: (data: { el: HTMLElement }) => boolean;
  }

  interface IBarbaHooks {
    after: (callback: () => void) => void;
    before: (callback: () => void) => void;
  }

  const barba: {
    init: (options: IBarbaOptions) => void;
    hooks: IBarbaHooks;
  };

  export default barba;
}
