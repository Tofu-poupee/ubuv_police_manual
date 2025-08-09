        const $ = (s, el = document) => el.querySelector(s);
        const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

        const searchInput = $('#searchInput');
        const clearBtn = $('#clearBtn');
        const tagsWrap = $('#tags');
        const countEl = $('#count');
        const emptyState = $('#emptyState');

        let activeTag = '__all';

        function buildTags() {
            const tagSet = new Set();const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

const searchInput = $('#searchInput');
const clearBtn = $('#clearBtn');
const tagsWrap = $('#tags');
const countEl = $('#count');
const emptyState = $('#emptyState');

let activeTag = '__all';

const tagCategories = {
    "ジョブ別タグ": ["警察", "救急隊", "メカニック", "飲食"],
};

function buildTags() {
    tagsWrap.innerHTML = '';

    Object.entries(tagCategories).forEach(([cat, tags]) => {
        const catDiv = document.createElement('div');
        catDiv.className = 'category';

        const header = document.createElement('div');
        header.className = 'category-header';
        header.textContent = cat;
        header.addEventListener('click', () => {
            catDiv.classList.toggle('open');
        });

        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'category-tags';

        const allBtn = document.createElement('button');
        allBtn.className = 'tag';
        allBtn.textContent = '全て';
        allBtn.dataset.tag = '__all';
        tagsDiv.appendChild(allBtn);

        tags.forEach(tag => {
            const b = document.createElement('button');
            b.className = 'tag';
            b.textContent = tag;
            b.dataset.tag = tag;
            tagsDiv.appendChild(b);
        });

        catDiv.appendChild(header);
        catDiv.appendChild(tagsDiv);
        tagsWrap.appendChild(catDiv);
    });
}

function filterRules() {
    const q = searchInput.value.toLowerCase();
    let visible = 0;

    $$('.rule').forEach(r => {
        const text = (r.textContent || '').toLowerCase();
        const tags = (r.dataset.tags || '').toLowerCase();
        const matchTag = activeTag === '__all' || tags.includes(activeTag.toLowerCase());
        const matchSearch = !q || text.includes(q);
        if (matchTag && matchSearch) {
            r.classList.remove('hidden');
            visible++;
        } else {
            r.classList.add('hidden');
        }
    });

    countEl.textContent = visible;
    emptyState.classList.toggle('hidden', visible > 0);

    // 検索時は該当カテゴリだけ展開
    if (q) {
        $$('.category').forEach(cat => {
            const hasMatch = Array.from(cat.querySelectorAll('.tag')).some(tagBtn => 
                tagBtn.textContent.toLowerCase().includes(q)
            );
            cat.classList.toggle('open', hasMatch);
        });
    }
}

tagsWrap.addEventListener('click', e => {
    const btn = e.target.closest('.tag'); 
    if (!btn) return;
    $$('.tag').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    activeTag = btn.dataset.tag;
    filterRules();
});

searchInput.addEventListener('input', filterRules);
clearBtn.addEventListener('click', () => { 
    searchInput.value = ''; 
    filterRules(); 
});

$('#expandAll').addEventListener('click', () => $$('.more').forEach(m => m.classList.remove('hidden')));
$('#collapseAll').addEventListener('click', () => $$('.more').forEach(m => m.classList.add('hidden')));

$('#ruleList').addEventListener('click', e => {
    const btn = e.target.closest('button'); 
    if (!btn) return;
    const rule = btn.closest('.rule'); 
    const act = btn.dataset.action;
    if (act === 'toggle') rule.querySelector('.more').classList.toggle('hidden');
    if (act === 'copy') {
        const txt = rule.textContent.trim();
        navigator.clipboard.writeText(txt);
    }
    if (act === 'anchor') {
        const id = rule.id || 'rule-' + Date.now();
        rule.id = id;
        navigator.clipboard.writeText(location.origin + location.pathname + '#' + id);
    }
});

$('#copyAll').addEventListener('click', () => {
    const txt = $$('.rule').filter(r => !r.classList.contains('hidden')).map(r => r.textContent.trim()).join('\n\n---\n\n');
    navigator.clipboard.writeText(txt);
});

$('#downloadJson').addEventListener('click', () => {
    const data = $$('.rule').map(r => ({
        title: r.querySelector('h3').textContent,
        tags: (r.dataset.tags || '').split(',').map(x => x.trim())
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'rules.json';
    a.click();
});

buildTags();
filterRules();

            $$('.rule').forEach(r => {
                (r.dataset.tags || '').split(',').map(x => x.trim()).filter(Boolean).forEach(tag => tagSet.add(tag));
            });
            tagsWrap.innerHTML = '';
            const allBtn = document.createElement('button');
            allBtn.className = 'tag active';
            allBtn.textContent = '全て';
            allBtn.dataset.tag = '__all';
            tagsWrap.appendChild(allBtn);
            tagSet.forEach(tag => {
                const b = document.createElement('button');
                b.className = 'tag';
                b.textContent = tag;
                b.dataset.tag = tag;
                tagsWrap.appendChild(b);
            });
        }

        function filterRules() {
            const q = searchInput.value.toLowerCase();
            let visible = 0;
            $$('.rule').forEach(r => {
                const text = (r.textContent || '').toLowerCase();
                const tags = (r.dataset.tags || '').toLowerCase();
                const matchTag = activeTag === '__all' || tags.includes(activeTag.toLowerCase());
                const matchSearch = !q || text.includes(q);
                if (matchTag && matchSearch) {
                    r.classList.remove('hidden'); visible++;
                } else r.classList.add('hidden');
            });
            countEl.textContent = visible;
            emptyState.classList.toggle('hidden', visible > 0);
        }

        tagsWrap.addEventListener('click', e => {
            const btn = e.target.closest('.tag'); if (!btn) return;
            $$('.tag').forEach(x => x.classList.remove('active'));
            btn.classList.add('active');
            activeTag = btn.dataset.tag;
            filterRules();
        });

        searchInput.addEventListener('input', filterRules);
        clearBtn.addEventListener('click', () => { searchInput.value = ''; filterRules(); });

        $('#expandAll').addEventListener('click', () => $$('.more').forEach(m => m.classList.remove('hidden')));
        $('#collapseAll').addEventListener('click', () => $$('.more').forEach(m => m.classList.add('hidden')));

        $('#ruleList').addEventListener('click', e => {
            const btn = e.target.closest('button'); if (!btn) return;
            const rule = btn.closest('.rule'); const act = btn.dataset.action;
            if (act === 'toggle') rule.querySelector('.more').classList.toggle('hidden');
            if (act === 'copy') {
                const txt = rule.textContent.trim();
                navigator.clipboard.writeText(txt);
            }
            if (act === 'anchor') {
                const id = rule.id || 'rule-' + Date.now();
                rule.id = id;
                navigator.clipboard.writeText(location.origin + location.pathname + '#' + id);
            }
        });

        $('#copyAll').addEventListener('click', () => {
            const txt = $$('.rule').filter(r => !r.classList.contains('hidden')).map(r => r.textContent.trim()).join('\n\n---\n\n');
            navigator.clipboard.writeText(txt);
        });

        $('#downloadJson').addEventListener('click', () => {
            const data = $$('.rule').map(r => ({
                title: r.querySelector('h3').textContent,
                tags: (r.dataset.tags || '').split(',').map(x => x.trim())
            }));
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'rules.json';
            a.click();
        });

        buildTags();

        filterRules();
