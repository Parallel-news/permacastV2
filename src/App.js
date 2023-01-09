import React, { useEffect, useState, useRef } from 'react';
import Shikwasa from './shikwasa-src/main.js';
import { useTranslation } from 'react-i18next';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Sidenav, NavBar } from './component/navbars.jsx';
import Background from './component/background.jsx';
import Search from "./pages/search.jsx";
import ArConnect from './component/arconnect.jsx';
import EpisodeQueue from './component/episode_queue.jsx';
import Fullscreen from './component/fullscreen.jsx';
import UploadPodcastView from './pages/uploadPodcast.jsx';
import Podcast from './pages/podcast.jsx';
import Episode from './pages/episode.jsx';
import Show from './pages/show.jsx';
import Creator from './pages/creator.jsx';
import Home from './pages/home.jsx';
import { getCreator, fetchPodcastTitles, convertSearchItem } from './utils/podcast.js';
import { appContext } from './utils/initStateGen.js';
import { MESON_ENDPOINT } from './utils/arweave.js';
import { useRecoilState } from 'recoil';
import VideoModal from './component/video_modal.jsx';
import { isFullscreen, primaryData } from './atoms/index.js';
import { getAllData } from "../src/services/services";
import { cacheTitles } from './utils/titles.js';

export default function App() {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);
  const [selection, setSelection] = useState(0);

  const [primaryData_, setPrimaryData_] = useRecoilState(primaryData)

  const videoRef = useRef();
  const [isFullscreen_, setIsFullscreen_] = useRecoilState(isFullscreen);
  const [player, setPlayer] = useState();
  const [isPaused, setIsPaused] = useState();
  const [currentEpisode, setCurrentEpisode] = useState({ contentTx: 'null', pid: 'null', eid: 'null', number: '1' });

  const [themeColor, setThemeColor] = useState('rgb(255, 255, 0)');
  const [currentPodcastColor, setCurrentPodcastColor] = useState('rgb(255, 255, 0)');
  const [backdropColor, setBackdropColor] = useState();

  const [address, setAddress] = useState();
  const [ANSData, setANSData] = useState({ address_color: "", currentLabel: "", avatar: "" });
  const [walletConnected, setWalletConnected] = useState(false);

  // const [podcasts, setPodcasts] = useState();
  // const [sortedPodcasts, setSortedPodcasts] = useState();
  const [queue, setQueue] = useState([]);
  const [queueVisible, setQueueVisible] = useState(false);

  // for the queue button
  useEffect(() => {
    console.log("Use effect player");
    const abortContr = new AbortController();
    try {
      getAllData({signal: abortContr.signal}).then((data) => setPrimaryData_(data));
    } catch(e) {
      console.log("Error fetching read data from App.js");
      console.log(e);
    }
      
    if (!player) return;
    const queue = player.ui.queueBtn;
    const paused = player.ui.playBtn;
    const fullscreen = player.ui.fullscreenBtn;

    queue.addEventListener('click', () => setQueueVisible(visible => !visible));
    paused.addEventListener('click', () => setIsPaused(paused => !paused));
    fullscreen.addEventListener('click', () => setIsFullscreen_(isFullscreen_ => !isFullscreen_));
    return () => {
      abortContr.abort()
    }
  }, [player]);

  const [creatorsLoading, setCreatorsLoading] = useState(true)
  const [creators, setCreators] = useState([]);

  const veryGoodWhitelistOfVeryGoodPeople = [
    "kaYP9bJtpqON8Kyy3RbqnqdtDBDUsPTQTNUCvZtKiFI",
    "vZY2XY1RD9HIfWi8ift-1_DnHLDadZMWrufSh-_rKF0",
    "lIg5mdDMAAIj5Pn2BSYKI8SEo8hRIdh-Zrn_LSy_3Qg"
  ]

  const [searchInput, setSearchInput] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [titlesLoading, setTitlesLoading] = useState(true);
  const [titles, setTitles] = useState([]);



  // const changeSorting = (n) => {
  //   setPodcasts(podcasts[filterTypes[n]])
  //   setSelection(n)
  // }

  // TODO: generalize
  /*
  const cacheTitles = async () => {
    if (Date.parse(localStorage.getItem("checkupDate")) <= new Date()) {
      const oldDateObj = new Date();
      const newDateObj = new Date();
      newDateObj.setTime(oldDateObj.getTime() + (20 * 60 * 1000)); // 20 minutes
      localStorage.setItem("checkupDate", newDateObj)
      Promise.all((await fetchPodcastTitles()).map(p => convertSearchItem(p))).then(titles => {
        setTitles(titles)
        localStorage.setItem("titles", JSON.stringify(titles))
      })
    } else {
      if (localStorage.getItem("titles")) {
        setTitles(JSON.parse(localStorage.getItem("titles")))
      } else {
        Promise.all((await fetchPodcastTitles()).map(p => convertSearchItem(p))).then(titles => {
          setTitles(titles)
          localStorage.setItem("titles", JSON.stringify(titles))
        })
      }

    }
  }
  */
  

  // TARGET page load
  useEffect(() => {
    // TODO: generalize
    if (!localStorage.getItem("checkupDate")) localStorage.setItem("checkupDate", new Date());
    playEpisode(null);
    const fetchData = async () => {

      //Seb Additions
      //let sorted = [];
      //sorted = sortedPodcasts[filterTypes[selection]];
      // localStorage.setItem("sortedPodcasts", JSON.stringify(sorted))
      

      //Seb Additions
      //const podcasts = sorted.splice(0, 9);
      // const recentPodcasts = sorted.splice(0, 9)

      //Seb Additions
      //const convertedPodcasts = await Promise.all(podcasts.map(p => convertToPodcast(p)));
      //const convertedEpisodes = await Promise.all(podcasts.splice(0, 3).map(p => convertToEpisode(p, p.episodes[0])));
      // setCurrentEpisode(convertedEpisodes[0])

      //Seb Additions
      //setRecentlyAdded(convertedEpisodes);
      //setFeaturedPodcasts(convertedPodcasts);

      // console.log(convertedPodcasts[0])
      // setFeaturedVideoShows(convertedVideoShows)
      // setSortedPodcasts(sorted)
      // setPodcasts(sorted[filterTypes[selection]])

      setTitlesLoading(true);
      const cached = await cacheTitles();
      console.log("cached: ", cached);
      setTitles(cached);
      //const cachedTitles = await cacheTitles();
      //console.log("cacheTitles(): ", cachedTitles);
      //setTitles(cachedTitles);
      setTitlesLoading(false);

      setCreatorsLoading(true);
      setCreators(await Promise.all(veryGoodWhitelistOfVeryGoodPeople.map(creatorAddress => getCreator(creatorAddress))));
      setCreatorsLoading(false);
      console.log("Use effect fetching");
    }
    if (!appLoaded) {
      fetchData();
      setAppLoaded(true);
      console.log("Use effect appLoaded");
    }
    console.log("Use effect actioning");
  }, [appLoaded]);

  window.addEventListener('keydown', function (e) {
    if (e.key == " " && e.target == document.body) {
      e.preventDefault();
    }
  });

  const appState = {
    t: t,
    creators: creators,
    loading: loading,
    otherComponentsLoading: {
      titles: titlesLoading,
      creators: creatorsLoading
    },
    appLoaded: appLoaded,
    setAppLoaded: setAppLoaded,
    globalModal: {
      isOpen: modalIsOpen,
      setIsOpen: setModalIsOpen,
    },
    theme: {
      themeColor: themeColor,
      backdropColor: backdropColor,
      currentPodcastColor: currentPodcastColor,
      setCurrentPodcastColor: setCurrentPodcastColor,
    },
    search: {
      input: searchInput,
      setInput: setSearchInput,
      titles: titles,
    },
    user: {
      address: address,
      setAddress: setAddress,
      ANSData: ANSData,
      setANSData: setANSData,
      walletConnected: walletConnected,
      setWalletConnected: setWalletConnected,
    },
    queue: {
      currentEpisode: currentEpisode, // move this down to playback
      get: () => queue,
      enqueueEpisode: (episode) => setQueue([episode]),
      enqueuePodcast: (episodes) => setQueue(episodes),
      play: (episode) => playEpisode(episode),
      playEpisode: (episode, number) => {
        setQueue([episode])
        playEpisode(episode, number)
      },
      visibility: queueVisible,
    },
    queueHistory: {
      // This can be used for playback history tracking
    },
    player: player,
    playback: {
      isPaused: isPaused,
      setIsPaused: setIsPaused,
    },
    videoRef: videoRef,
  }

  const playEpisode = (episode, number = 1) => {
    const player = new Shikwasa({
      container: () => document.querySelector('.podcast-player'),
      themeColor: 'yellow',
      theme: 'dark',
      autoplay: true,
      audio: {
        title: episode?.episodeName || 'Permacast not selected',
        artist: primaryData_.podcasts === undefined ?
          'Standby..' : primaryData_.podcasts.filter((obj_) => {
            return obj_.episodes.filter((obj__) => {
              return obj__.eid === episode.eid
            })
          })[0].author,
        cover: primaryData_.podcasts === undefined ?
        'https://ih1.redbubble.net/image.2647292310.1736/st,small,845x845-pad,1000x1000,f8f8f8.jpg' : 'https://arweave.net/'+primaryData_.podcasts.filter((obj_) => {
            return obj_.episodes.filter((obj__) => {
              return obj__.eid === episode.eid
            })
          })[0].cover,
        color: episode?.color || 'text-[rgb(255,255,0)] bg-[rgb(255,255,0)]/20',
        src: `${MESON_ENDPOINT}/${episode?.contentTx}`,
      },
    })

    if (episode) {
      setPlayer(player)
      setCurrentEpisode({ ...episode, number: number }) // add it to local storage for later
      player.play()
      window.scrollTo(0, document.body.scrollHeight)
    }
  };

  // TODO
  // cache images
  // finish tab switching gradient color animation
  // improve AR rounding
  /* mobile view
    - episode list
    - podcast list
    - podcast page
    - episode page
    - search
    - queue (maybe)
  */
  // re-write fetch logic to not block the rest of the app // Mostly done
  // use fuse.js for better search (?)
  // re-write getAverageColor functions to use in-memory images (?)

  return (
    <>
      <div className="select-none h-full bg-black overflow-hidden " data-theme="permacast">
        <appContext.Provider value={appState}>
          <Router>
            <div className="flex h-screen">
              <div className="fixed z-[60] bottom-0 w-full">
                {/*Once purpose resolved, state var here needs to be localized*/}
                <div className={`relative podcast-player rounded-t-xl backdrop-blur-sm ${isFullscreen_ ? "bg-zinc-900/60" : "bg-zinc-900"}`}>
                  {/* {!loading && currentEpisode ? <Player episode={currentEpisode} />: <div>Loading...</div>} */}
                </div>
              </div>
              <div className="hidden md:block z-50">
                <div className="w-[100px] z-50 flex justify-center">
                  <Sidenav />
                </div>
              </div>

              <div className="z-50">
                <div className="absolute z-50 bottom-0 right-0" style={{ display: queueVisible ? 'block' : 'none' }}>
                  {!loading ? <EpisodeQueue /> : <div className="h-full w-full animate-pulse bg-gray-900/30"></div>}
                </div>
              </div>
              {isFullscreen_ && <Fullscreen episode={currentEpisode} number={currentEpisode?.number || 1} />}
              <Background className="w-screen overflow-scroll">
                <div className="ml-8 pr-8 pt-9">
                  <div className="mb-10">
                    <NavBar />
                  </div>
                  <div className="w-full overflow-hidden">
                    <Route
                      exact
                      path="/"
                      component={({ match }) => <Home />}
                    />
                    <Route
                      exact
                      path="/uploadpodcast"
                      component={({ match }) => <UploadPodcastView />}
                    />
                    {/* <Route
                    exact
                    path="/following"
                    component={({match}) => <div className="text-3xl">Coming soon!</div>}
                  /> */}
                    <Route
                      exact
                      path="/search"
                      component={({ match }) => <Search />}
                    />
                    <Route
                      exact
                      path="/podcast/:podcastId"
                      render={({ match }) => <Podcast match={match} />}
                    />
                    <Route
                      exact
                      path="/podcast/:podcastId/:episodeNumber"
                      render={({ match }) => <Episode match={match} />}
                    />
                    <Route
                      exact
                      path="/shows"
                      render={({ match }) => <Show match={match} />}
                    />
                    <Route
                      exact
                      path="/creator/:creatorAddress"
                      render={({ match }) => <Creator match={match} />}
                    />
                  </div>
                </div>
              </Background>            
              <VideoModal/>
            </div>
          </Router>
        </appContext.Provider>
      </div>
    </>
  );
}
