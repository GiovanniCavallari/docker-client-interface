const scroll = ({ top = 0, smooth = false }) => {
  const behavior = smooth ? 'smooth' : 'auto';
  window.scroll({ top, behavior });
};

export default scroll;
