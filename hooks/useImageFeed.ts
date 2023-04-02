import useSWR from 'swr';
import fetchImages from '~/lib/utils/fetchImages';

type ImageType = {
  name: string;
  url: string;
};

export function useImageFeed() {
  const {
    data: images,
    isLoading,
    mutate: refresh,
    isValidating,
  } = useSWR<ImageType[]>('/api/images', fetchImages, {
    revalidateOnFocus: false,
  });

  return {
    images,
    isLoading,
    refresh,
    isValidating,
  };
}
