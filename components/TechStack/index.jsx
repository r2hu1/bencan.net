'use client';

import { GrTechnology } from 'react-icons/gr';
import Card from '@/components/TechStack/Card';
import config from '@/config';

export default function TechStack() {
  return (
    <section className="mt-[100px] flex flex-col gap-y-2">
      <h1 className="text-xl font-medium">
        Tech Stack
        <GrTechnology className='inline-block ml-2' />
      </h1>

      <p>
        A list of technologies/apps I use on a daily basis.
      </p>

      <div className="flex flex-wrap gap-4 my-4">
        {Object.entries(config.techStack).map(([name, icon], index) => (
          <Card
            icon={icon}
            name={name}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}