import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';
import { DefaultErrorBoundary } from './error-boundary';

export class AppOutlet extends React.Component<
  object,
  { error: null | undefined | boolean | any }
> {
  state = { error: null };
  componentDidCatch(error: any) {
    this.setState({
      error,
    });
  }
  render() {
    return (
      <Suspense fallback={<LoadingOverlay visible />}>
        {this.state.error ? <DefaultErrorBoundary children={undefined} /> : <Outlet />}
      </Suspense>
    );
  }
}
