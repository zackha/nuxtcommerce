export const useComponents = () => {
  const isOpenImageSliderModal = useState<boolean>('isOpenImageSliderModal', () => false);

  return {
    isOpenImageSliderModal,
  };
};
