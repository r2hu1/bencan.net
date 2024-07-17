import { FaDiscord, FaInstagram, FaNodeJs } from 'react-icons/fa';
import { BiLogoGmail } from 'react-icons/bi';
import { RiReactjsLine } from 'react-icons/ri';
import { SiExpress, SiMongodb, SiTailwindcss, SiVercel, SiVisualstudiocode } from 'react-icons/si';
import { IoLogoCss3, IoLogoHtml5, IoLogoJavascript } from 'react-icons/io';
import { TbBrandNextjs } from 'react-icons/tb';

const config = {
  selectedWorks: [
    {
      image: 'https://i.imgur.com/hqBoGAs.png',
      title: 'Distalk',
      description: 'A Discord bot that allows you to chat anonymously with other users without having worry about your identity. No data collected.',
      tech: ['Node.js', 'MongoDB'],
      link: 'https://discord.gg/hnNDMTYxD2'
    },
    {
      image: 'https://i.imgur.com/aXVsY1q.png',
      title: 'Lantern',
      description: 'Lantern broadcasts your Discord status to an API and WebSocket, allowing you to display your presence on your website or other services.',
      tech: ['Express', 'MongoDB'],
      link: 'https://github.com/discordplace/lantern'
    },
    {
      image: 'https://i.imgur.com/k73UnJZ.png',
      title: 'Discord Place',
      description: 'All things related to Discord in one place. Find the best bots, servers, and communities.',
      tech: ['Next.js', 'Express', 'MongoDB'],
      link: 'https://discord.place'
    },
    {
      image: 'https://i.imgur.com/XXrkGOK.png',
      title: 'Steam Auto Try Converter',
      description: 'A Google Chrome extension that automatically converts prices to TRY from USD with the current exchange rate on Steam web pages.',
      tech: ['JavaScript'],
      link: 'https://github.com/chimpdev/steam-auto-try-converter'
    },
    {
      image: 'https://i.imgur.com/4eFt9Oz.png',
      title: 'Discord SFX',
      description: 'A website that allows you download mp3 files for your Discord Soundboard.',
      tech: ['Next.js', 'Express', 'MongoDB'],
      link: 'https://discordsfx.com'
    },
    {
      image: 'https://i.imgur.com/PIAu4fe.jpg',
      title: 'Psimed',
      description: 'A website for mental health center specializing in psychiatry, psychology, and psychotherapy.',
      tech: ['React'],
      link: 'https://psimed.com.tr'
    },
    {
      image: 'https://i.imgur.com/zVc91Zb.jpg',
      title: 'KİPT',
      description: 'A website for a psychotherapy company specializing in evidence-based, short-term sessions for improved relationships and life quality, grounded in attachment models.',
      tech: ['React'],
      link: 'https://kisilerarasiiliskilerterapisi.com'
    },
    {
      image: 'https://i.imgur.com/5luXgfT.jpg',
      title: 'Seçim Barış Yasaman',
      description: 'A website for a simulate election that in Discord Roleplay Server.',
      tech: ['React'],
      link: 'https://secim.barisyasaman.com'
    },
    /*{
      image: 'https://i.imgur.com/7RpSTfk.png',
      title: 'Evil Magic',
      description: 'A website for Evil Magic NFT project.',
      tech: ['Next.js']
    },*/
    {
      image: 'https://i.imgur.com/XXrkGOK.png',
      title: 'bencan.net',
      description: 'My personal website. You are here.',
      tech: ['Next.js'],
      link: 'https://github.com/chimpdev/bencan.net'
    },
    {
      image: 'https://i.imgur.com/XXrkGOK.png',
      title: 'Squirrelers Bot',
      description: 'A Discord bot for squirrel lovers. For DDevs Buildathon. Open sourced.',
      tech: ['Node.js', 'MongoDB'],
      link: 'https://github.com/chimpdev/squirrelers-bot'
    }
  ],
  contactLinks: [
    { icon: FaDiscord, to: 'https://discord.com/users/957840712404193290' },
    { icon: FaInstagram, to: 'https://instagram.com/gokhanknows' },
    { icon: BiLogoGmail, to: 'mailto:skyhancloud@gmail.com' }
  ],
  techStack: {
    'Next.js': TbBrandNextjs,
    'React': RiReactjsLine,
    'Express': SiExpress,
    'MongoDB': SiMongodb,
    'Node.js': FaNodeJs,
    'TailwindCSS': SiTailwindcss,
    'Vercel': SiVercel,
    'VSCode': SiVisualstudiocode,
    'CSS': IoLogoCss3,
    'HTML': IoLogoHtml5,
    'JavaScript': IoLogoJavascript
  }
};

export default config;