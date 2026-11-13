import {
  createElement,
  JSX,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from 'react';
import { DescendantContext } from './bones/DescendantContext';
import { DescendantManager } from './bones/DescendantManager';

function Descendant(props: PropsWithChildren<{}>): JSX.Element {
  const manager = useRef(new DescendantManager());

  // force rerender and used for debugging
  const [descendants, setDescendants] = useState(0);

  const register = useCallback(
    (node: HTMLElement | null) => {
      manager.current.register(node);
      setDescendants((prev) => prev + 1);
    },
    [manager, setDescendants]
  );

  const unregister = useCallback(
    (node: HTMLElement | null) => {
      manager.current.unregister(node);
      setDescendants((prev) => prev - 1);
    },
    [manager, setDescendants]
  );

  return createElement(
    DescendantContext.Provider,
    { value: { register, unregister, descendants, manager: manager.current } },
    props.children
  );
}

export default Descendant;
