const StorageService = () => {
  const get = (key) => {
    if (!localStorage) return {};
    return JSON.parse(localStorage.getItem(key));
  };

  const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  return {
    get,
    set,
  };
};

export default new StorageService();
