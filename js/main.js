(function () {
  var P = window.PROJECTS || [];
  var S = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    skip: '<path d="M5 5l9 7-9 7zM16 5v14"/>',
    mute: '<path d="M4 9v6h4l5 4V5L8 9zM17 9l4 6M21 9l-4 6"/>',
    timer: '<circle cx="12" cy="13" r="7"/><path d="M12 9v4l2.5 2M9 3h6"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 01-8 0zM8 6H4a3 3 0 004 4M16 6h4a3 3 0 01-4 4M12 13v4M8 20h8"/>',
    refresh: '<path d="M20 11a8 8 0 00-14-4L4 9M4 4v5h5M4 13a8 8 0 0014 4l2-2M20 20v-5h-5"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    phone: '<rect x="7" y="3" width="10" height="18" rx="2.5"/><path d="M11 18h2"/>',
    cloud: '<path d="M7 18a4 4 0 01-.5-8 5.5 5.5 0 0110.7 1.2A3.5 3.5 0 0117 18z"/>',
    dumbbell: '<path d="M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12"/>',
    flame: '<path d="M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z"/>',
    bolt: '<path d="M13 3L5 13h6l-1 8 8-10h-6z"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
    users: '<circle cx="9" cy="9" r="3"/><path d="M3 20c0-3.5 2.5-6 6-6s6 2.5 6 6M16 6a3 3 0 010 6M18 14c2 .7 3 2.8 3 6"/>',
    db: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3 3 7 3s7-1.3 7-3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    bell: '<path d="M6 16V11a6 6 0 0112 0v5l2 2H4zM10 21h4"/>',
    inbox: '<path d="M3 13l3-8h12l3 8v6H3zM3 13h5l1 3h6l1-3h5"/>',
    piggy: '<path d="M5 12a7 6 0 0114 0c0 2-1 3-2 4v3h-3v-1h-4v1H7v-3c-1-1-2-2-2-4zM9 9h3"/>',
    widget: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    check: '<circle cx="12" cy="12" r="8"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
    route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a3 3 0 000-6h-4a3 3 0 010-6h6"/>',
    map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14"/>',
    download: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
    github: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function icon(name, size) {
    var s = size || 22;
    return '<svg class="ico" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" ' + S + ' aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  }
  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  var STATUS = {
    activo: 'Disponible',
    desarrollo: 'En desarrollo',
    privado: 'Acceso privado'
  };

  function button(link, kind, project) {
    if (!link) return '';
    if (!link.url) {
      return '<span class="btn btn-' + kind + ' is-off" aria-disabled="true">' + esc(link.label) + '</span>';
    }
    var ico = kind === 'primary' ? (/APK/.test(link.label) ? 'download' : 'arrow') : 'github';
    return '<a class="btn btn-' + kind + '" href="' + esc(link.url) + '" rel="noopener">' + icon(ico, 18) + esc(link.label) + '</a>';
  }

  function card(p) {
    var stats = p.stats.map(function (s) {
      return '<div class="stat"><b>' + esc(s.value) + '</b><span>' + esc(s.label) + '</span></div>';
    }).join('');
    var feats = p.features.map(function (f) {
      return '<li>' + icon(f.icon) + '<div><h4>' + esc(f.title) + '</h4><p>' + esc(f.text) + '</p></div></li>';
    }).join('');
    var flow = p.flow.map(function (n, i) {
      return (i ? '<span class="link" aria-hidden="true"></span>' : '') +
        '<li class="node">' + icon(n.icon, 24) + '<b>' + esc(n.title) + '</b><span>' + esc(n.text) + '</span></li>';
    }).join('');
    var stack = p.stack.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
    var version = p.version ? '<span class="ver">v' + esc(p.version) + '</span>' : '';
    return '' +
      '<article class="project" id="' + esc(p.id) + '" style="--accent:' + p.accent + ';--on-accent:' + p.ink + '">' +
        '<div class="head">' +
          '<div class="meta"><span class="pill s-' + esc(p.status) + '">' + (STATUS[p.status] || '') + '</span>' +
            '<span class="plat">' + esc(p.platform) + '</span>' + version + '</div>' +
          '<h2>' + esc(p.name) + '</h2>' +
          '<p class="tag">' + esc(p.tagline) + '</p>' +
          '<p class="sum">' + esc(p.summary) + '</p>' +
          '<div class="actions">' + button(p.links.primary, 'primary') + button(p.links.secondary, 'ghost') + '</div>' +
          (p.note ? '<p class="note">' + esc(p.note) + '</p>' : '') +
        '</div>' +
        '<div class="info" role="group" aria-label="Infografía de ' + esc(p.name) + '">' +
          '<div class="stats">' + stats + '</div>' +
          '<ul class="feats">' + feats + '</ul>' +
          '<div class="how"><h3>Cómo funciona</h3><ol class="flow">' + flow + '</ol></div>' +
          '<div class="tech"><h3>Tecnología</h3><ul>' + stack + '</ul></div>' +
        '</div>' +
      '</article>';
  }

  document.getElementById('proyectos').innerHTML = P.map(card).join('');
  document.getElementById('nav').innerHTML = P.map(function (p) {
    return '<a href="#' + esc(p.id) + '" data-id="' + esc(p.id) + '">' + esc(p.name) + '</a>';
  }).join('');
  document.getElementById('chips').innerHTML = P.map(function (p) {
    return '<a class="chip" href="#' + esc(p.id) + '" style="--accent:' + p.accent + '"><i></i>' + esc(p.name) + '</a>';
  }).join('');
  document.getElementById('year').textContent = new Date().getFullYear();

  // Resalta en el menú el proyecto que se está viendo.
  if ('IntersectionObserver' in window) {
    var links = document.querySelectorAll('#nav a');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle('on', a.dataset.id === e.target.id); });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('.project').forEach(function (el) { io.observe(el); });
  }
})();
