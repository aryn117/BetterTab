import  { useState } from 'react';
import { useFavoriteLinks } from '../contexts/FavoriteLinksContext';

import { IoMdAdd } from "react-icons/io";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdDone } from "react-icons/md";

function FavoriteLinks() {
  const { links, addLink, deleteLink } = useFavoriteLinks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLink, setNewLink] = useState({ url: '', category: '', name: '' });
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addLink(newLink);
    setNewLink({ url: '', category: '', name: '' });
    setIsModalOpen(false);
  };

  const groupedLinks = links.reduce((acc, link) => {
    const category = link.category.trim() || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(link);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedLinks).sort((a, b) => {
    if (a === 'Uncategorized') return 1;
    if (b === 'Uncategorized') return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="card  mt-2 w-full bg-base-200 text-base-content shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title w-full mr-2 border-b-2 border-b-accent">Favorite Links</h2>
          <button
            className="btn btn-sm btn-outline text-accent-content btn-accent"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? <MdDone claassName=" text-2xl"  /> :  <MdOutlineModeEditOutline className='text-xl ' />}
          </button>
        </div>
        {editMode && (
          <button className="btn btn-primary mb-4" onClick={() => setIsModalOpen(true)}>
            <IoMdAdd className='text-xl' />
          </button>
        )}
        {sortedCategories.map((category) => (
          <div key={category} className="mt-2">
            <h3 className="font-bold text-xl ">{category === 'Uncategorized' ? '' : category}</h3>
            <ul>
              {groupedLinks[category].map((link, index) => (
                <li key={index} className="flex items-center justify-between gap-2 mb-1">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className=" hover:text-success">
                    {link.name}
                  </a>
                  {editMode && (
                    <button onClick={() => deleteLink(link)} className="btn btn-secondary btn-outline btn-sm">
                      <MdDeleteOutline className='text-xl ' />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {category !== 'Uncategorized' && category !== sortedCategories[sortedCategories.length - 1] && (
              <div className="divider"></div>
            )}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-base-100 p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Link</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="URL"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="input input-bordered w-full mb-2"
                required
              />
              <input
                type="text"
                placeholder="Category (optional)"
                value={newLink.category}
                onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
                className="input input-bordered w-full mb-2"
              />
              <input
                type="text"
                placeholder="Name"
                value={newLink.name}
                onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                className="input input-bordered w-full mb-4"
                required
              />
              <button type="submit" className="btn btn-primary mr-2">Add</button>
              <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FavoriteLinks;