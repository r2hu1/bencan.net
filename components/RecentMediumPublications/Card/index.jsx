import Link from 'next/link';

export default function MediumPublicationCard({ publication }) {
  return (
    <Link className='w-full sm:w-[300px] h-max flex flex-col gap-y-2' href={publication.link}>
      <h1 className='font-semibold'>{publication.title}</h1>
      <p className='text-xs text-muted-foreground line-clamp-2 whitespace-nowrap-2'>
        {publication.description}
      </p>
      
      <div className='flex mt-4 text-xs gap-x-2 text-muted-foreground'>
        <span>
          {Math.ceil(publication.description.split(' ').length / 200)} min read
        </span>
        <span>&middot;</span>
        <span>
          {new Date(publication.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>
    </Link>
  );
}