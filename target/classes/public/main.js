async function fetchJson(path) {
  const res = await fetch(path);
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { raw: text }; }
}

document.getElementById('btn-chain').addEventListener('click', async () => {
  const out = document.getElementById('chain-output');
  out.textContent = 'Loading...';
  try {
    const data = await fetchJson('/api/chain');
    out.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    out.textContent = String(e);
  }
});

const form = document.getElementById('balance-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const address = document.getElementById('address').value.trim();
  const out = document.getElementById('balance-output');
  out.textContent = 'Loading...';
  try {
    const data = await fetchJson(`/api/balance/${address}`);
    out.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    out.textContent = String(err);
  }
});
