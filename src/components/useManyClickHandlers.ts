import { debounce } from 'lodash';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useManyClickHandlers = (
  ...handlers: Array<(e: React.UIEvent<HTMLElement>) => void>
) => {
  const callEventHandler = (e: React.UIEvent<HTMLElement>) => {
    if (e.detail <= 0) return;
    const handler = handlers[e.detail - 1];
    if (handler) {
      handler(e);
    }
  };

  const debounceHandler = debounce((e: React.UIEvent<HTMLElement>) => {
    callEventHandler(e);
  }, 250);

  return (e: React.UIEvent<HTMLElement>) => {
    e.persist();
    debounceHandler(e);
  };
};
