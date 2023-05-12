import Head from 'next/head';
import NavBarMain from '../copmonents/contextComponents/navBar/NavBarMain';
import Content from '../copmonents/infoComponents/whitepaper/Content';
import TableOfContent from '../copmonents/infoComponents/whitepaper/TableOfContent';

export default function Whitepaper() {
  return (
    <>
      <Head>
        <title>Zoinks Hedge</title>
        <meta name="description" content="Zoinks Hedge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBarMain>
        <div className="flex gap-8 pc540:pl-10 py-32">
          <Content />
          <div className="hidden w-5/12 pc540:block tableOfContent">
            <div className="sticky top-0 h-screen overflow-auto touch-auto">
              <TableOfContent />
            </div>
          </div>
        </div>
      </NavBarMain>
    </>
  );
}
