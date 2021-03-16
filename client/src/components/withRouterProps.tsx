import React from 'react';
import { useHistory, useParams } from "react-router-dom";

export interface WithRouterProps {
  params: any;
  history: any;
}

function withRouterProps<T extends WithRouterProps = WithRouterProps>(WrappedComponent: React.ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";
  const ComponentWithRouterProps = (props: Omit<T, keyof WithRouterProps>) => {
    let params = useParams();
    let history = useHistory();
    return <WrappedComponent {...(props as T)} history={history} params={params} />
  }
  ComponentWithRouterProps.displayName = `withRouterProps(${displayName})`;

  return ComponentWithRouterProps;
}

export default withRouterProps;