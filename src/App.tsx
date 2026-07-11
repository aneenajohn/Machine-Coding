import { useState, useRef, useEffect } from "react";
import "./App.css";

type Meta = {
  currentPage: number;
  hasMore: boolean;
  pageSize: number;
  total: number;
};

type Quote = {
  id: number;
  text: string;
  author: string;
};

type PaginatedQuotes = {
  meta: Meta;
  quotes: Quote[];
};

const fetchQuotes = async (
  page: number = 1,
  limit = 15
): Promise<PaginatedQuotes> => {
  const data = await fetch(
    `https://dummyjson.com/quotes?limit=${limit}&skip=${(page - 1) * limit}`
  ).then((res) => res.json());

  return {
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
};

export default function App() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLLIElement | null>(null);
  const productRefs = useRef<(HTMLLIElement | null)[]>([]);

  const [quoteList, setQuoteList] = useState<Quote[]>([]);

  const page = useRef(1);
  const loading = useRef(false);

  const fetchNext = async () => {
    if (loading.current) return;

    loading.current = true;

    const { quotes } = await fetchQuotes(page.current);

    setQuoteList((prev) => [...prev, ...quotes]);

    page.current++;

    loading.current = false; 
  };

  useEffect(() => {
    fetchNext();
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLLIElement;

          // console.log("Visible:", element.innerText);

          const timer = setTimeout(() => {
            console.log("Stayed 10 seconds:", element.innerText);
          }, 10000);

          // console.log('Element', element.className);
          if(element.className === 'trigger') {
            fetchNext();
          }
          element.onmouseleave = () => clearTimeout(timer);
        });
      },
      {
        root: rootRef.current,
        threshold: 0.7,
      }
    );

    productRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    }); 

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, [quoteList]);

  return (
    <div className="container" ref={rootRef}>
      <ol>
        {quoteList.map((quote, index) => (
          <li
            key={quote.id}
            ref={(el) => {
              productRefs.current[index] = el;
            }}
            className="list-item"
          >
            {quote.text} - {quote.author}
          </li>
        ))}

        <li
          ref={triggerRef}
          className="trigger"
        >
          Load more...
        </li>
      </ol>
    </div>
  );
}