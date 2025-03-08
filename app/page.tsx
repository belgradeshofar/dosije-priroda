// app/page.tsx
import HeroSection from './components/HeroSection';
import LatestStories from './components/LatestStories';
import ProtectedSpecies from './components/ProtectedSpecies';
import NatureMysteries from './components/NatureMysteries';
import VideoDocumentaries from './components/VideoDocumentaries';
import CallToAction from './components/CallToAction';

export default function Home() {
  return (
    <>
      <HeroSection />
      <main id="main-content">
        <LatestStories />
        <ProtectedSpecies />
        <VideoDocumentaries />
        <NatureMysteries />
        <CallToAction />
      </main>
    </>
  );
}
