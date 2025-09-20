'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Input } from '@/components/ui/input';
import Icon from '@/public/images/icon.png';

export default function ApiKey() {
  // State to hold the input's value
  const [key, setKey] = useState('');

  // Retrieve the API key from sessionStorage on component mount
  useEffect(() => {
    const savedKey = sessionStorage.getItem('geminiApiKey');
    if (savedKey) {
      setKey(savedKey);
    }
  }, []);

  function handleSave() {
    // Save the API key to sessionStorage
    try {
      sessionStorage.setItem('geminiApiKey', key);
      toast.success('API key preserved.');
    } catch (error) {
      toast.error(`Failed to save API key. ${error}`);
    }
  }

  return (
    <section className="flex flex-col justify-center items-center h-full w-full px-5">
      <Image src={Icon} alt="Loading..." height={50} width={50} />

      <p className="text-2xl text-neutral-200 font-medium mt-2 text-center">
        Add your Gemini API Key
      </p>

      <p className="mt-1 max-w-xs text-center text-neutral-600">
        We will never store your API key. It will be erased after each session.
      </p>

      <div className="flex w-full max-w-xs gap-x-2 mt-6">
        <Input
          type="password"
          placeholder="Paste key here."
          onChange={(e) => setKey(e.target.value)}
          value={key}
        />

        <button
          type="button"
          onClick={handleSave}
          className="bg-neutral-200 text-neutral-950 text-sm px-2 rounded hover:cursor-pointer hover:bg-neutral-300 transition"
        >
          Save
        </button>
      </div>

      <Toaster richColors />
    </section>
  );
}
