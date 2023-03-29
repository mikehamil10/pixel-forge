const fetchSuggestion = () =>
  fetch('/api/suggestions', {
    cache: 'no-store',
  }).then((response) => response.json());

export default fetchSuggestion;
