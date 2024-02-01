import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';

export default function WorkCard(data) {
  return (
    <>
      <div className="block w-[20px] h-full" />
      <div className="w-[700px] h-[250px] xl:w-[350px] xl:h-[250px] rounded-lg relative" style={{
        backgroundImage: `url(${data.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute flex flex-col justify-end w-full h-full p-4 rounded-lg bg-gradient-to-t from-black via-black/80 gap-y-2">
          <h2 className="text-xl font-semibold text-white">{data.title}</h2>
          <p className="text-xs text-white text-opacity-80 text-pretty">{data.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.tech.map(tech => (
              <span key={tech} className="text-xs font-semibold text-opacity-80 bg-secondary px-2 py-0.5 rounded-sm">{tech}</span>
            ))}
          </div>
          {data.link && (
            <Link href={data.link} className='flex items-center mt-1 text-xs text-white hover:underline gap-x-1'>
              <span className='block max-w-[220px] truncate'>{data.link.split('//')[1]}</span>
              <MdArrowOutward />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}