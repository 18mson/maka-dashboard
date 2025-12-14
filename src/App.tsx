import { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import OwnersPage from './pages/OwnersPage';
import OwnerDetailPage from './pages/OwnerDetailPage';
import ChargerStationsPage from './pages/ChargerStationsPage';

type Page = 'home' | 'owners' | 'stations' | 'owner-detail';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleViewOwnerDetails = (ownerId: string) => {
    setSelectedOwnerId(ownerId);
    setCurrentPage('owner-detail');
  };

  const handleBackToOwners = () => {
    setSelectedOwnerId(null);
    setCurrentPage('owners');
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'owners' && (
        <OwnersPage onViewDetails={handleViewOwnerDetails} />
      )}
      {currentPage === 'owner-detail' && selectedOwnerId && (
        <OwnerDetailPage ownerId={selectedOwnerId} onBack={handleBackToOwners} />
      )}
      {currentPage === 'stations' && <ChargerStationsPage />}
    </Layout>
  );
}

export default App;
