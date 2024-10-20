import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const FavoriteLinksContext = createContext();
export const useFavoriteLinks = () => useContext(FavoriteLinksContext);

export const FavoriteLinksProvider = ({ children }) => {
  const [links, setLinks] = useState(() => {
    const savedLinks = localStorage.getItem('favoriteLinks');
    return savedLinks ? JSON.parse(savedLinks) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteLinks', JSON.stringify(links));
  }, [links]);

  const addLink = (link) => {
    setLinks([...links, link]);
  };

  const deleteLink = (linkToDelete) => {
    setLinks(links.filter(link => link !== linkToDelete));
  };

  return (
    <FavoriteLinksContext.Provider value={{ links, addLink, deleteLink }}>
      {children}
    </FavoriteLinksContext.Provider>
  );
};

FavoriteLinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
}