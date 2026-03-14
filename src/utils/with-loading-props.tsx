import { useContext, createContext } from 'react';

// ----------------------------------------------------------------------

export function withLoadingProps<T extends {}>(
  loader: (useLoadingProps: () => T) => React.ComponentType<T>
): React.ComponentType<T> {
  const LoadingPropsContext = createContext<T>({} as T);

  const useLoadingProps = () => useContext(LoadingPropsContext);

  const DynamicComponent = loader(useLoadingProps);

  function WithLoadingPropsComponent(props: T) {
    return (
      <LoadingPropsContext.Provider value={props}>
        <DynamicComponent {...props} />
      </LoadingPropsContext.Provider>
    );
  }

  return WithLoadingPropsComponent;
}
