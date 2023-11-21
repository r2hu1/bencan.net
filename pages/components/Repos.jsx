import Link from "next/link";
import Seperator from "./Seperator";
import { LuGithub, LuStar } from "react-icons/lu";
import { SiJavascript, SiCss3 } from "react-icons/si";
import allowedRepos from '../../data/allowedRepos.json'
import Twemoji from 'react-twemoji';
import { motion } from "framer-motion";
import { forwardRef } from "react";

export default function Repos({ repositories }) {

  if (!repositories) repositories = [
    {
      owner: {
        login: 'chimpdev',
        avatar_url: 'https://avatars.githubusercontent.com/u/55600314?v=4',
        html_url: 'https://github.com/chimpdev'
      },
    }
  ];

  const languageIcons = {
    'JavaScript': <SiJavascript className="text-yellow-300 rounded-sm" />,
    'CSS': <><SiCss3 className="text-blue-500 rounded-sm" /> CSS</>,
    'SCSS': 'SCSS'
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: .2,
        staggerChildren: .1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const Custom = forwardRef(({ ...props }, ref) => (
    <Link ref={ref} {...props} />
  ));
  const CustomLinkMotion = motion(Custom);

  return (
    <>
      <Seperator />
      <div className="flex flex-col mx-6">
        <h1 className='flex flex-wrap items-center gap-2 text-lg'>
          GitHub Repositories
          <Link className='flex items-center ml-0 text-sm transition-all duration-300 ease-in-out sm:ml-2 gap-x-1 text-light-tertiaryText dark:text-dark-tertiaryText hover:text-light-primaryText hover:dark:text-dark-primaryText' href={repositories[0].owner.html_url} target='_blank'>
            <img src={repositories[0].owner.avatar_url} className='w-5 h-5 rounded-full' />
            {repositories[0].owner.login}
          </Link>

          <span className='flex items-center ml-2 text-sm gap-x-1 text-light-tertiaryText dark:text-dark-tertiaryText'>
            <LuGithub /> {repositories.filter(({ fork, name }) => !fork && allowedRepos.includes(name)).length}
          </span>
        </h1>

        <motion.div className='flex flex-wrap items-center gap-2.5 mt-5 select-none' variants={container} initial='hidden' whileInView='show'>
          {repositories
            .filter(({ fork, name }) => !fork && allowedRepos.includes(name))
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .map((repo, index) => (
              <CustomLinkMotion className="flex flex-col w-full px-4 py-2 border-2 cursor-pointer rounded-xl gap-y-2 h-max bg-light-secondary dark:bg-dark-secondary border-light-tertiary dark:border-dark-tertiary hover:dark:bg-dark-tertiary hover:bg-light-tertiary" key={index} href={repo.html_url} target='_blank' variants={item}>
                <div className="flex text-sm gap-x-0.5">
                  <span className="text-light-tertiaryText dark:text-dark-tertiaryText">/</span>
                  <span className="max-w-[300px] truncate">{repo.name}</span>
                </div>

                {repo.description && (
                  <Twemoji>
                    <p className="text-sm text-light-tertiaryText dark:text-dark-tertiaryText [&>img]:w-4 [&>img]:h-4 [&>img]:inline-block">
                      {repo.description}
                    </p>
                  </Twemoji>
                )}

                <div className="flex items-center text-base gap-x-2">
                  <span className="flex items-center text-sm text-light-tertiaryText dark:text-dark-tertiaryText gap-x-1">
                    {languageIcons[repo.language]}
                  </span>
                  <span className="flex items-center text-sm text-light-tertiaryText dark:text-dark-tertiaryText gap-x-1">
                    <LuStar /> {repo.stargazers_count}
                  </span>
                </div>
              </CustomLinkMotion>
            ))}
        </motion.div>
      </div>
    </>
  );
}