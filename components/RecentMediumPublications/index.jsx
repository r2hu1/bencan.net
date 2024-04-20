'use client';

import { FaMedium } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import fetchPublications from '@/lib/fetchPublications';
import { toast } from 'sonner';
import MediumPublicationCard from '@/components/RecentMediumPublications/Card';

export default function RecentMediumPublications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublications().then(response => {
      if (response.success) setPublications(response.data);
      setLoading(false);

      if (!response.success) toast.error(response.error);
    });
  }, []);
  
  return (
    <section className="mt-[100px] flex flex-col">
      <h1 className="text-xl font-medium">
        Recent Medium Publications
        <FaMedium className='inline-block ml-2' />
      </h1>

      <div className='flex flex-wrap h-full gap-4 mt-6'>
        {loading && (
          <span className='text-sm font-medium'>
            Loading publications..
          </span>
        )}

        {!loading && publications.length === 0 ? (
          <span className='text-sm font-medium'>
            No publications found.
          </span>
        ) : (
          publications
            .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
            .slice(0, 4)
            .map((publication, index) => (
              <MediumPublicationCard key={index} publication={publication} />
            ))
        )}
      </div>
    </section>
  );
}