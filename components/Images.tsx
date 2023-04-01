'use client';

import React from 'react';
import fetchImages from '~/lib/utils/fetchImages';
import useSWR from 'swr';
import Image from 'next/image';

type ImageType = {
  name: string;
  url: string;
};

export default function Images() {
  const {
    data: images,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR<ImageType[]>('/api/images', fetchImages);

  return (
    <div>
      <button
        className="fixed bottom-10 right-10 bg-violet-400/90 hover:bg-violet-500 text-white px-5 py-3 rounded-md font-bold focus:ring-2 focus:ring-violet-400 z-20"
        onClick={() => refreshImages(images)}
      >
        {!isLoading && isValidating ? 'Refreshing...' : 'Refresh Images'}
      </button>

      {isLoading && (
        <p className="animate-pulse text-center pb-7 font-extralight">
          Loading Images..
        </p>
      )}

      <div className="px-0 md:px-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {images?.map((image, index) => (
          <div
            key={image.name}
            className={`relative cursor-help hover:scale-105 transition-transform duration-200 ease-in-out ${
              index === 0 && 'md:col-span-2 md:row-span-2'
            }`}
          >
            <div className="absolute flex w-full h-full p-5 justify-center items-center bg-white z-10 opacity-0 hover:opacity-80 transition-opacity duration-200">
              <p className="text-center font-light text-lg">
                {image.name.split('_').shift()?.split('.').shift()}
              </p>
            </div>

            <Image
              src={image.url}
              alt={image.name}
              width={800}
              height={800}
              className="w-full rounded-sm shadow-2xl drop-shadow-lg -z-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
