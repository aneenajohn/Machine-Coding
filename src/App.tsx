import { useState, useRef, useEffect } from 'react'
import './App.css'

// {
//   "meta": {
//     "currentPage": 2,
//     "hasMore": true,
//     "pageSize": 5,
//     "total": 49
//   },
//   "quotes": [
//     {
//       "id": 6,
//       "author": "Eleanor Roosevelt",
//       "text": "The future belongs to those who believe in the beauty of their dreams."
//     }
//   ]
// }

type Meta = {
  currentPage: number,
  hasMore: boolean,
  pageSize: number,
  total: number
}

type Quote = {
  id: number,
  text: string,
  author: string
}

type PaginatedQuotes = {
  meta: Meta,
  quotes: Quote[]
};

// const page = 1;
// const limit = 15;

const fetchQuotes = async (page: number =1, limit=15):Promise<PaginatedQuotes> => {
  // const result = fetch(`https://dummyjson.com/quotes?limit=${limit}&skip=${(page - 1) * limit}`)
  const data = await fetch(
    `https://dummyjson.com/quotes?limit=${limit}&skip=${(page - 1) * limit}`
  ).then((res) => res.json());

  const result = {
    meta: {
      currentPage: page,
      hasMore: data.skip + data.limit < data.total,
      pageSize: data.limit,
      total: data.total,
    },
    quotes: data.quotes.map((q: any) => ({
      id: q.id,
      author: q.author,
      text: q.quote,
    })),
  };

  return result;
}

function App() {
  
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLLIElement | null>(null)
  const [quoteList, setQuoteList] = useState<Quote[]>([])

  const page = useRef<number>(1);
  const loading = useRef<boolean>(false);

  const fetchNext = async () => {

    if (loading.current) return;
    loading.current = true;

    const { meta, quotes } = await fetchQuotes(page.current);
    console.log('Quotes:', quotes);
    setQuoteList(prev => [...prev, ...quotes]);
    console.log('Current page:', page.current);
    page.current = page.current + 1;

    loading.current = false;
  }

  useEffect(() => {
    fetchNext();
  }, [])

  useEffect(() => {
    if(!rootRef.current) {
      return;
    }

    const options = {
      root: rootRef.current as HTMLDivElement, 
      rootMargin: '0px',
      threshold: 0.7
    }
    const observer = new IntersectionObserver((entries) => {
      console.log('Entries', entries);
      // if(entries[0].isIntersecting) {
      //   const element = entries[0].target;
      //   console.log(`The intersecting element ${element.innerHTML}`)
      //   fetchNext();
      // }

      entries.forEach((entry) => {
        console.log(entry.isIntersecting, entry.intersectionRatio);
        if (entry.isIntersecting) {
          fetchNext();
        }
      });

    }, options)

    if(triggerRef.current) {
      // observer.disconnect();
      observer.observe(triggerRef.current as HTMLLIElement)
    }

    return () => {
      observer.disconnect();
    }
  }, []);

  return (
    <div className="container" ref={rootRef}>
      <ol>
        {quoteList.map((quote: string, _: number) => (
          <li key={quote.id} className="list-item">
            {quote.text} - {quote.author}
          </li>
        ))}
        <li className="trigger" ref={triggerRef}>Load more ...</li>
      </ol>
    </div>
  )
}

export default App
