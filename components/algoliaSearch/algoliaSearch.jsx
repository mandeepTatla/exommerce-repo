'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import {
  Configure,
  Highlight,
  InstantSearch,
  SearchBox,
  useHits
} from 'react-instantsearch-hooks-web';
import { indexName, searchClient } from './algoliaClient';
import styles from './algoliaSearch.module.css';

function Hit({ hit }) {
  return (
    <Link href={`/product/${hit.handle}`}>
      <div className={styles.hitItem}>
        <Image src={hit.image} alt={hit.title} className={styles.hitImage} width={60} height={60} />
        <div>
          <h2 className={`${styles.hitTitle} line-clamp-2`}>
            <Highlight attribute="title" hit={hit} />
          </h2>
          <p className={styles.hitPrice}>${hit.price}</p>
        </div>
      </div>
    </Link>
  );
}

function CustomHits(props) {
  const { query } = props;
  const { hits } = useHits();

  return (
    <>
      {hits.length === 0 ? (
        <div className={styles.noResults}>
          <p className={styles.noResultsFound}>No results found. Try a different search term.</p>
        </div>
      ) : (
        <>
          {hits.length > 5 && query.length >= 2 && (
            <div className={styles.viewAllWrapper}>
              <Link href={`/search?q=${query}`} passHref>
                <div className={styles.viewAll}>
                  <span className={styles.viewText}>View all the results</span>
                  <FaArrowCircleRight />
                </div>
              </Link>
            </div>
          )}
          {hits.map((hit) => (
            <Hit key={hit.objectID} hit={hit} />
          ))}
        </>
      )}
    </>
  );
}

export const Search = () => {
  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const isEnterPressed = useRef(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && query.length >= 2) {
      event.preventDefault();
      isEnterPressed.current = true;
      setShowResults(false);
      document.body.classList.remove('dropdown-open');
      router.push(`/search?q=${query}`);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      isEnterPressed.current = false;
      return;
    }
    setQuery(event.target.value);
    setShowResults(true);
    document.body.classList.add('dropdown-open');
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowResults(false);
      document.body.classList.remove('dropdown-open');

      // Restore viewport settings after blur
      const viewport = document.querySelector('meta[name=viewport]');
      viewport.setAttribute('content', 'width=device-width, initial-scale=1');
    }, 200);
  };

  const handleFocus = () => {
    const viewport = document.querySelector('meta[name=viewport]');
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    );
  };

  return (
    <InstantSearch indexName={indexName} searchClient={searchClient}>
      <Configure hitsPerPage={8} />
      <div className={styles.searchWrapper}>
        <SearchBox
          placeholder="Search for Product ..."
          classNames={{
            root: styles.searchRoot,
            input: styles.searchInput
          }}
          onFocus={handleFocus}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />

        {showResults && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownHeader}>
              <h3>SEARCH SUGGESTIONS</h3>
              <button
                onClick={() => {
                  setShowResults(false);
                  document.body.classList.remove('dropdown-open');
                }}
                className={styles.closeButton}
              >
                close
              </button>
            </div>
            <CustomHits query={query} />
          </div>
        )}
      </div>
    </InstantSearch>
  );
};
