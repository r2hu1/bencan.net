import { LuFrown } from "react-icons/lu";
import Header from "@/pages/components/Header";
import OpacityMotion from "@/pages/components/OpacityMotion";
import Head from "next/head";

export default function Page500() {
  return (
    <>
      <Head>
        <title>{`bencan.net: Bir hata oluştu`}</title>
        <meta name="description" content="Bir hata oluştu." />
        <meta name="keywords" content="bencan, bencan.net, bencan.net, bencan.net, bencan.net" />
        <meta name="author" content="Discord @ben.can" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={`bencan.net: Bir hata oluştu`} />
        <meta property="og:description" content="Bir hata oluştu." />
        <meta property="og:image" content="https://bencan.net/images/og-image.png" />
        <meta property="og:url" content={`https://bencan.net`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />

        <meta name="twitter:title" content="bencan.net" />
        <meta name="twitter:description" content="Bir hata oluştu." />
        <meta name="twitter:image" content="https://bencan.net/images/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="canonical" href="https://bencan.net" />
      </Head>
      <div className="w-full h-full flex justify-center">
        <div className="w-full min-h-[100dvh] max-w-[700px] px-6 mb-12">
          <Header />
          <OpacityMotion>
            <div className="mx-6 mt-28 flex flex-col">
              <h1 className='text-lg flex items-center gap-x-1'>
                <LuFrown /> Bir hata oluştu.
              </h1>

              <p className='text-light-secondaryText dark:text-dark-secondaryText text-sm mt-4'>
                Sayfa yüklenmeye çalışırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.
              </p>
            </div>
          </OpacityMotion>
        </div>
      </div>
    </>
  )
};