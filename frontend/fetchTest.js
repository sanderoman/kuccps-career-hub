(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/programmes');
    const j = await res.json();
    console.log('api call from node fetch', j);
  } catch (e) { console.error('fetch error', e); }
})();