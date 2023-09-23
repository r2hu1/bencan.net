import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa"; 
import Image from 'next/image';
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export default function SpotifyActivity() {
  const [data, setData] = useState(null);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const [socket, setSocket] = useState(null);
  const [heartbeatInterval, setHeartbeatInterval] = useState(30000);

  useEffect(() => {
    const websocketUrl = 'wss://api.lanyard.rest/socket';
    const websocket = new WebSocket(websocketUrl);

    setSocket(websocket);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onopen = () => {
      socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: '957840712404193290' } }));
    };
  
    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.op === 1) setHeartbeatInterval(data.d?.heartbeat_interval);
      if (data.t === 'INIT_STATE') setData(data.d?.spotify);
      else if (data.t === 'PRESENCE_UPDATE') setData(data.d?.spotify);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const interval = setInterval(() => {
      socket.send(JSON.stringify({ op: 3 }));
    }, heartbeatInterval);

    return () => {
      clearInterval(interval);
    };
  }, [socket, heartbeatInterval]);

  useEffect(() => {
    if (!data) return;

    const startTimestamp = data.timestamps.start;
    const endTimestamp = data.timestamps.end;
    const currentTimestamp = Date.now();
    
    const elapsedMilliseconds = currentTimestamp - startTimestamp;
    const totalMilliseconds = endTimestamp - startTimestamp;
    
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const totalSeconds = Math.floor(totalMilliseconds / 1000);

    setTotalSeconds(totalSeconds);
    setCurrentSeconds(elapsedSeconds % totalSeconds);

    const interval = setInterval(() => {
      setCurrentSeconds(currentSeconds => currentSeconds + 1);
    }, 1000);

    const timeout = setTimeout(() => {
      setData(null);
    }, totalMilliseconds);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [data]);


  return (
    <AnimatePresence>
      {data && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .2, delay: 0.2, ease: 'easeInOut' }} key={data.session_id} exit={{ opacity: 0, y: 10 }}>
          <div className="my-3 text-xs flex items-center gap-1.5 text-tertiaryTextColor flex-wrap">
            Şu anda <span className="text-green-400 flex items-center gap-x-1 -mr-1"><FaSpotify className='inline' size={18} /> Spotify</span>'da <span className='text-neutral-200 inline-flex items-center gap-x-1'><Image src={data.album_art_url} width={18} height={18} className='rounded-full inline' /> {data.song}</span> dinliyorum.
          </div>

          <div className='flex-1 h-0.5 bg-tertiaryBackgroundColor rounded-full relative' >
            <div className='h-full bg-green-500 rounded-full absolute transition-all duration-1000 ease-in-out' style={{ width: `${(currentSeconds / totalSeconds) * 100}%` }} />
            <span className="h-full w-full rounded-full absolute transition-all duration-1000 ease-in-out flex justify-end items-center left-8 text-xs text-tertiaryTextColor" style={{ maxWidth: `${(currentSeconds / totalSeconds) * 100}%` }}>
              {Math.floor(currentSeconds / 60)}:{currentSeconds % 60 < 10 ? `0${currentSeconds % 60}` : currentSeconds % 60}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};