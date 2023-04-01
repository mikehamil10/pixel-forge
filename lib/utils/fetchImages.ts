const fetchImages = () =>
  fetch('/api/images', {
    cache: 'no-store',
  }).then((response) => response.json());

export default fetchImages;
