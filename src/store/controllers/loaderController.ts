interface ILoaderAction {
  type: string;
  payload: {
    loading: boolean;
  };
}

const handleLoading = () => {};
