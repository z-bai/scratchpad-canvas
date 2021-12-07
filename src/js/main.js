function toCanvasPoint(x, y) {
  const el = document.querySelector('#canvas');
  const bound = el.getBoundingClientRect();
  return [x - bound.x, y - bound.y];
}

function pointermove(e) {
  console.log("pointermove");
  const el = document.querySelector('#canvas');
  const c = el.getContext('2d');
  c.lineWidth = "4px";

  const [x , y] = toCanvasPoint(e.clientX, e.clientY);
  c.lineTo(x, y);
  c.stroke();
}

function pointerup(e) {
  console.log("pointerup");
  const el = document.querySelector('#canvas');
  el.removeEventListener('pointermove', pointermove);
  el.removeEventListener('pointerup', pointerup);
}

function pointerdown(e) {
  console.log("pointerdown");
  const el = document.querySelector('#canvas');
  el.setPointerCapture(e.pointerId);
  el.addEventListener('pointermove', pointermove);
  el.addEventListener('pointerup', pointerup);

  const c = el.getContext('2d');
  c.beginPath();

  const [x , y] = toCanvasPoint(e.clientX, e.clientY);
  c.arc(x, y, 0.5, 0, 2 * Math.PI, true);
  c.fill();
}

function startup() {
  const el = document.querySelector('#canvas');
  el.addEventListener('pointerdown', pointerdown);

  const btn = document.querySelector('#save');
  btn.addEventListener('click', () => {
    const el = document.querySelector('#canvas');
    const dataurl = el.toDataURL('image/png').replace("image/png", "image/octet-stream"); ;
    window.location.href = dataurl;
  });
}

window.addEventListener('DOMContentLoaded', startup);
