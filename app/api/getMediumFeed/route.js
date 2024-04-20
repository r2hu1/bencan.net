import rssParser from 'rss-parser';

export async function GET() {
  const feedURL = 'https://medium.com/feed/@bencan';
  
  const response = await fetch(feedURL);
  const data = await response.text();

  const parser = new rssParser();
  const feed = await parser.parseString(data);

  const publications = feed.items.map(item => ({
    title: item.title,
    description: item['content:encodedSnippet'],
    link: item.link,
    pubDate: item.pubDate,
  }));

  return new Response(JSON.stringify(publications), {
    headers: { 'Content-Type': 'application/json' },
  });
}