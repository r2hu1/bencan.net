import { MdOutlineContactSupport } from 'react-icons/md';
import Card from '@/components/Contact/Card';
import config from '@/config';

export default function Contact() {
  return (
    <section className="mt-[100px] flex flex-col gap-y-2">
      <h1 className="text-xl font-medium">
        Contact me
        <MdOutlineContactSupport className='inline-block ml-2' />
      </h1>

      <p>
        You can contact me on Instagram, Discord etc. Just select the platform you want to contact me below.
      </p>

      <div className="flex flex-wrap gap-4 my-4">
        {config.contactLinks.map(link => (
          <Card
            icon={link.icon}
            link={link.to}
            key={link.to}
          />
        ))}
      </div>
    </section>
  );
}