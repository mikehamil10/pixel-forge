'use client';

import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { useImageFeed } from '~/hooks/useImageFeed';
import fetchSuggestion from '~/lib/open-ai/chat-gpt/fetchSuggestion';

export default function PromptInput() {
  const { refresh } = useImageFeed();
  const [input, setInput] = useState('');

  const {
    data: suggestion,
    isLoading,
    isValidating,
    mutate: newSuggestion,
  } = useSWR<string>('/api/suggestions', fetchSuggestion, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;

  const submitPrompt = async (useSuggestion?: boolean) => {
    const prompt = useSuggestion ? suggestion! : input;
    setInput('');

    // Show a loading notification
    const notification = toast.loading(
      `DALL-E is creating: '${prompt.slice(0, 20)}...'`,
    );

    const res = await fetch('/api/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    // Show a toast and refresh the feed (if successful)
    if (res.ok) {
      toast.success('DALL-E is finished. Check-out your masterpiece!', {
        id: notification,
      });
      refresh();
    } else {
      toast.error('DALL-E had a problem generating your image.', {
        id: notification,
      });
    }

    // If the user used the suggestion, generate a new one
    if (useSuggestion) {
      newSuggestion();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  return (
    <div className="m-10">
      <form
        className="flex flex-col lg:flex-row border rounded-md shadow-md shadow-slate-400/10 lg:divide-x"
        onSubmit={handleSubmit}
      >
        <textarea
          placeholder={
            (loading && 'Thinking of an awesome idea...') ||
            suggestion ||
            "Enter a suggestion or press 'New Suggestion' for inspiration..."
          }
          className="flex-1 p-4 outline-none rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          type="submit"
          disabled={!input}
          className={`p-4 font-bold transition-colors duration-200 ${
            input
              ? 'bg-violet-500 text-white'
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          Generate
        </button>
        <button
          type="button"
          className="p-4 bg-violet-400 text-white font-bold transition-colors duration-200 disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={() => submitPrompt(true)}
        >
          Use Suggestion
        </button>
        <button
          type="button"
          className="p-4 bg-white text-violet-500 font-bold border-none transition-colors rounded-b-md md:rounded-r-md md:rounded-bl-none duration-200"
          onClick={() => newSuggestion()}
        >
          New Suggestion
        </button>
      </form>

      {input && (
        <p className="italic p-2 pl-2 font-light">
          Suggestion:{' '}
          <span className="text-violet-500">
            {loading ? 'Thinking of an awesome idea...' : suggestion}
          </span>
        </p>
      )}
    </div>
  );
}
