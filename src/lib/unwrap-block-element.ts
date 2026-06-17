import { Children, isValidElement, type ReactElement, type ReactNode } from "react";

export function unwrapBlockElement(children: ReactNode): ReactNode {
  const childArray = Children.toArray(children);
  if (childArray.length === 1 && isValidElement(childArray[0])) {
    const child = childArray[0] as ReactElement<{ children?: ReactNode }>;
    if (child.type === "p") {
      return child.props.children;
    }
  }
  return children;
}
