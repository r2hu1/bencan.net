import CreateInviteButton from '@/components/Hero/CreateInviteButton';

export default function Hero() {
  return (
    <section className="mt-[100px] flex gap-y-8 flex-col">
      <h1 className="text-3xl font-bold max-w-[600px]">
        Can is a full-stack developer that you{'\''}ll want to work with.
      </h1>

      <p className="max-w-[600px]">
        Can currently works as a freelancer. He loves to learn new things and he{'\''}s always open to new ideas. He is a high school student and he is 18 years old. Currently exploring the world of Next.js.
      </p>

      <CreateInviteButton />
    </section>
  );
}