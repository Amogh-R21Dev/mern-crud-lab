const A = '/api/items';
let items = [], eid = null;

async function load() {
  items = await (await fetch(A)).json();
  tb.innerHTML = items.map(i => `<tr>
    <td>${i.id}</td><td>${i.name}</td><td>₹${i.price}</td>
    <td><button onclick="edit(${i.id})">Edit</button>
    <button onclick="del(${i.id})">Delete</button></td></tr>`).join('');
}

document.forms[0].onsubmit = async e => {
  e.preventDefault();
  await fetch(eid ? `${A}/${eid}` : A, {
    method: eid ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: nm.value, price: +pr.value })
  });
  eid = null; e.target.reset(); sb.textContent = 'Submit'; load();
};

function edit(id) {
  const i = items.find(x => x.id == id);
  eid = id; nm.value = i.name; pr.value = i.price; sb.textContent = 'Update';
}

async function del(id) {
  if (confirm('Delete this item?')) {
    await fetch(`${A}/${id}`, { method: 'DELETE' });
    load();
  }
}

onmousemove = e => document.body.style.backgroundPosition =
  e.clientX / 15 + 'px ' + e.clientY / 15 + 'px';
load();
