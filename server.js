const express = require('express');
const app = express();
app.use(express.json(), express.static('public'));

let items = [], n = 1;

app.get('/api/items', (q, r) => r.json(items));

app.post('/api/items', (q, r) => {
  const i = { id: n++, ...q.body };
  items.push(i);
  r.json(i);
});

app.put('/api/items/:id', (q, r) => {
  const i = items.find(x => x.id == q.params.id);
  Object.assign(i, q.body);
  r.json(i);
});

app.delete('/api/items/:id', (q, r) => {
  items = items.filter(x => x.id != q.params.id);
  r.json({ ok: true });
});

app.listen(3000, () => console.log('http://localhost:3000'));
