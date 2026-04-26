const urlRegex = /^(?:\w+:\/\/)?(?:[^\/]+)(?:\/|$)/;

// Test the regex with example URLs
const urls = [
  'http://www.example.com',
  'https://subdomain.example.com',
  'https://www.example.com:8080',
  'ftp://example.com',
  'www.example.com',
  'example.com/path/to/resource',
  'http://127.0.0.1:7777/page-shopping',
];

urls.forEach(url => {
  const matchedPart = url.match(urlRegex);
  const extractedUrl = matchedPart ? matchedPart[0] : '';
  console.log(`Original URL: ${url}`);
  console.log(`Extracted URL: ${extractedUrl}`);
  console.log('-----------------------');
});