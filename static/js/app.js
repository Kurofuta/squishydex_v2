let squishies = [];
let selectedId = null;
let currentFilter = "all";
let currentCategory = null;
let activeTab = "gallery";

const gallery = document.getElementById("gallery");
const sidebar = document.getElementById("sidebar");
const sidebarEmpty = document.getElementById("sidebar-empty");
const sidebarContent = document.getElementById("sidebar-content");
const viewGallery = document.getElementById("view-gallery");
const viewAdd = document.getElementById("view-add");

async function loadSquishies() {
    const res = await fetch("/api/squishies");
    squishies = await res.json();
    updateStats();
    buildCategoryFilters();
    renderGallery();
}

function updateStats() {
    const owned = squishies.filter((s) => s.owned).length;
    const totalQty = squishies.reduce((sum, s) => sum + s.total_quantity, 0);
    document.getElementById("stat-owned").textContent = owned;
    document.getElementById("stat-total").textContent = squishies.length;
    document.getElementById("stat-qty").textContent = totalQty;
}

function buildCategoryFilters() {
    const categories = [...new Set(squishies.map((s) => s.category))].sort();
    const container = document.getElementById("category-filters");
    container.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.className = "category-btn active";
    allBtn.textContent = "Toutes";
    allBtn.onclick = () => {
        currentCategory = null;
        document.querySelectorAll(".category-btn").forEach((b) => b.classList.remove("active"));
        allBtn.classList.add("active");
        renderGallery();
    };
    container.appendChild(allBtn);

    categories.forEach((cat) => {
        const btn = document.createElement("button");
        btn.className = "category-btn";
        btn.textContent = cat;
        btn.onclick = () => {
            currentCategory = cat;
            document.querySelectorAll(".category-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            renderGallery();
        };
        container.appendChild(btn);
    });
}

function getFilteredSquishies() {
    return squishies.filter((s) => {
        if (currentFilter === "owned" && !s.owned) return false;
        if (currentFilter === "missing" && s.owned) return false;
        if (currentCategory && s.category !== currentCategory) return false;
        return true;
    });
}

function renderGallery() {
    const filtered = getFilteredSquishies();
    gallery.innerHTML = filtered
        .map(
            (s) => `
        <div class="squishy-card ${s.owned ? "" : "not-owned"} ${s.id === selectedId ? "selected" : ""}"
             data-id="${s.id}">
            <div class="squishy-card-image">
                <img src="${s.image_url}" alt="${escapeHtml(s.name)}" loading="lazy">
            </div>
            <div class="squishy-card-info">
                <div class="squishy-card-name">${escapeHtml(s.name)}</div>
                <div class="squishy-card-meta">
                    ${s.owned ? `×${s.total_quantity}` : "Non possédé"} · ${escapeHtml(s.category)}
                </div>
            </div>
        </div>
    `
        )
        .join("");

    gallery.querySelectorAll(".squishy-card").forEach((card) => {
        card.addEventListener("click", () => selectSquishy(Number(card.dataset.id)));
    });
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
}

function selectSquishy(id) {
    selectedId = id;
    renderGallery();

    const s = squishies.find((sq) => sq.id === id);
    if (!s) return;

    sidebarEmpty.classList.add("hidden");
    sidebarContent.classList.remove("hidden");
    sidebar.classList.add("open");

    document.getElementById("sidebar-name").textContent = s.name;
    document.getElementById("sidebar-category").textContent = s.category;
    document.getElementById("sidebar-img").src = s.image_url;
    document.getElementById("sidebar-img").alt = s.name;

    const imgWrap = document.querySelector(".sidebar-image-wrap");
    imgWrap.classList.toggle("not-owned", !s.owned);

    const status = document.getElementById("sidebar-status");
    status.textContent = s.owned ? "Possédé" : "Manquant";
    status.className = `badge ${s.owned ? "badge-owned" : "badge-missing"}`;

    document.getElementById("sidebar-qty").textContent = s.total_quantity;

    const colorsList = document.getElementById("colors-list");
    colorsList.innerHTML = s.colors
        .map(
            (c) => `
        <div class="color-item ${c.owned ? "" : "not-owned"}" data-color-id="${c.id}">
            <div class="color-swatch" style="background-color: ${c.color_hex}"
                 title="${escapeHtml(c.color_name)}"></div>
            <div class="color-info">
                <div class="color-name">${escapeHtml(c.color_name)}</div>
                ${c.owned && c.acquired_date ? `<div class="color-date">Obtenu le ${formatDate(c.acquired_date)}</div>` : ""}
            </div>
            <div class="color-actions">
                ${
                    c.owned
                        ? `
                    <div class="qty-control">
                        <button class="qty-btn qty-minus" data-id="${c.id}">−</button>
                        <span class="qty-value">${c.quantity}</span>
                        <button class="qty-btn qty-plus" data-id="${c.id}">+</button>
                    </div>
                `
                        : `
                    <button class="btn-validate" data-id="${c.id}">Valider</button>
                `
                }
            </div>
        </div>
    `
        )
        .join("");

    colorsList.querySelectorAll(".btn-validate").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            validateColor(Number(btn.dataset.id));
        });
    });

    colorsList.querySelectorAll(".qty-minus").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const color = s.colors.find((c) => c.id === Number(btn.dataset.id));
            updateQuantity(Number(btn.dataset.id), color.quantity - 1);
        });
    });

    colorsList.querySelectorAll(".qty-plus").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const color = s.colors.find((c) => c.id === Number(btn.dataset.id));
            updateQuantity(Number(btn.dataset.id), color.quantity + 1);
        });
    });
}

async function validateColor(colorId) {
    const res = await fetch(`/api/colors/${colorId}/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: 1 }),
    });
    const updated = await res.json();
    updateSquishyInList(updated);
    selectSquishy(updated.id);
    updateStats();
}

async function updateQuantity(colorId, newQty) {
    const res = await fetch(`/api/colors/${colorId}/quantity`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQty }),
    });
    const updated = await res.json();
    updateSquishyInList(updated);
    selectSquishy(updated.id);
    updateStats();
}

function updateSquishyInList(updated) {
    const idx = squishies.findIndex((s) => s.id === updated.id);
    if (idx !== -1) squishies[idx] = updated;
    renderGallery();
}

function switchTab(tab) {
    activeTab = tab;
    document.querySelectorAll(".tab").forEach((t) => {
        t.classList.toggle("active", t.dataset.tab === tab);
    });

    if (tab === "gallery") {
        viewGallery.classList.remove("hidden");
        viewAdd.classList.add("hidden");
    } else {
        viewGallery.classList.add("hidden");
        viewAdd.classList.remove("hidden");
        closeSidebar();
    }
}

function closeSidebar() {
    selectedId = null;
    sidebar.classList.remove("open");
    sidebarContent.classList.add("hidden");
    sidebarEmpty.classList.remove("hidden");
    renderGallery();
}

document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});

document.querySelectorAll('input[name="filter"]').forEach((input) => {
    input.addEventListener("change", () => {
        currentFilter = input.value;
        renderGallery();
    });
});

document.getElementById("sidebar-close").addEventListener("click", closeSidebar);

const addForm = document.getElementById("add-form");
const imageInput = document.getElementById("add-image");
const imagePreview = document.getElementById("image-preview");
const previewImg = document.getElementById("preview-img");
const formMessage = document.getElementById("form-message");

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
        previewImg.src = URL.createObjectURL(file);
        imagePreview.classList.remove("hidden");
    } else {
        imagePreview.classList.add("hidden");
    }
});

addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    formMessage.classList.add("hidden");

    const formData = new FormData(addForm);

    try {
        const res = await fetch("/api/squishies", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();

        if (!res.ok) {
            formMessage.textContent = data.error || "Erreur lors de l'ajout";
            formMessage.className = "form-message error";
            formMessage.classList.remove("hidden");
            return;
        }

        squishies.push(data);
        squishies.sort((a, b) => a.name.localeCompare(b.name));
        updateStats();
        buildCategoryFilters();

        formMessage.textContent = `"${data.name}" ajouté avec succès !`;
        formMessage.className = "form-message success";
        formMessage.classList.remove("hidden");

        addForm.reset();
        document.getElementById("add-color-hex").value = "#FFB6C1";
        imagePreview.classList.add("hidden");

        setTimeout(() => {
            switchTab("gallery");
            selectSquishy(data.id);
            formMessage.classList.add("hidden");
        }, 1200);
    } catch {
        formMessage.textContent = "Erreur de connexion au serveur";
        formMessage.className = "form-message error";
        formMessage.classList.remove("hidden");
    }
});

loadSquishies();
