import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { appContext } from '../utils/initStateGen';
import Track from '../component/track';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { sortPodcasts } from '../utils/podcast';
import { allPodcasts, titles } from '../atoms';
import { cacheTitles } from '../utils/titles';
import { input } from '../atoms';

export function Searchbar() {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const [_input, _setInput] = useRecoilState(input);

  //const { input, setInput } = appState.search;

  return (
    <div>
      <form className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pr-10 pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-zinc-600" />
        </div>
        <input
          type="text"
          value={_input}
          onChange={(e) => {
            _setInput(e.target.value);
            if (!location.pathname.includes("search")) history.push("/search");
          }}
          className="input input-secondary block pl-10 py-2.5 md:py-[14px] text-xs md:text-base w-full placeholder-zinc-600 focus:placeholder-white rounded-lg md:rounded-full bg-zinc-900 text-zinc-100 outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          placeholder={t("search.placeholder")}
        />
      </form>
    </div>
  )
}

export default function Search() {

  const [ _allPodcasts, _setAllPodcasts ] = useRecoilState(allPodcasts);
  const [ _titles, _setTitles ] = useRecoilState(titles);
  const [ loaded, setLoaded ] = useState(false);
  const [ , setError ] = useState();
  const [_input, ] = useRecoilState(input);

  const filteredPodcasts = _titles ? 
    _titles.filter((p) => {
      if (_input === '') return;
      if (p.type === "eid") return;
      else return p.title.toLowerCase().includes(_input.toLowerCase());
    })
    :
    "";
  const { t } = useTranslation();

  useEffect(() => {
    const titlesContr = new AbortController();
    // Fetch Titles & Cache
    cacheTitles({signal: titlesContr.signal }).then(cache => _setTitles(cache)).catch((e) => setError(e));
    console.log("NEW TITLES: ", _titles);
    
    // Clean-up
    return () => {
      titlesContr.abort();
    }
  }, []);

  
  useEffect(() => {
    const podcastsContr = new AbortController();
      // Fetch Podcasts
    const filters = [
      { type: "episodescount", desc: t("sorting.episodescount") },
      { type: "podcastsactivity", desc: t("sorting.podcastsactivity") }
    ];
    const filterTypes = filters.map(f => f.type);
    
    sortPodcasts(filterTypes, {signal: podcastsContr.signal }).then(sortedPods => _setAllPodcasts(sortedPods)).catch(e => setError(e));  
    console.log("NEW PODCASTS: ", _allPodcasts);

    return () => {
      podcastsContr.abort();
    }
  }, []);


  return (
    <div className="text-white h-full pb-80">
      {!loaded ? <div className="text-2xl text-white font-bold mb-6">{t("search.loading")}</div> : (
        <div>
          {_input.length !== 0 ?
            (
              <>
                <div className="text-2xl text-white font-bold mb-6">{t("search.podcasts")}</div>
                {filteredPodcasts.length !== 0 ? (
                  <>
                    {filteredPodcasts?.map((filtered, idx) => (
                      <div key={idx} className="mb-6 p-2.5 border rounded-xl border-zinc-600">
                        <Track episode={filtered} includePlayButton={false} />
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-2xl text-white font-bold mb-12">{t("search.nopodcasts")}</div>
                )}
                {/* <div className="text-2xl text-white font-bold mb-6">{t("search.episodes")}</div> */}
                {/* {filteredEpisodes.length !== 0 ? (
                  <>
                    {filteredEpisodes?.map((filtered, idx) => (
                      <div key={idx} className="mb-6 p-2.5 border rounded-xl border-zinc-600">
                        <Track episode={filtered} episodeNumber={idx} />
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-2xl text-white font-bold mb-12">{t("search.noepisodes")}</div>
                )} */}
              </>
            )
            :
            (
              <div className="text-center text-white text-2xl">
                Start typing to search for podcasts or episodes...
              </div>
            )
          }
        </div>
      )}
    </div>
  )
}
