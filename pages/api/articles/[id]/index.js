export default function handler(request, response) {
  const { id } = request.query;

  const fs = require('fs');
  const path = require('path');

  const files = fs.readdirSync(path.join('public', 'articles'));
  const articles = files.map(filename => {
    const markdownContent = fs.readFileSync(path.join('public', 'articles', filename)).toString();
    const withoutMetadata = markdownContent.split('---').slice(2).join('---');
    const metadata = markdownContent.split('---')[1].split('\n').reduce((acc, curr) => {
      const [key, value] = curr.split(': ');
      return { ...acc, [key]: value };
    }, {});

    return {
      filename,
      metadata,
      markdownContent,
      markdownWithoutMetadata: withoutMetadata
    };
  });

  const sortedByDate = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  const articleIndex = sortedByDate.findIndex(article => article.filename.replace('.md', '') === id);
  const currentArticle = sortedByDate[articleIndex];

  return response.json(currentArticle);
};