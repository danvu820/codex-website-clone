class NeruvaCart {
  constructor() {
    this.drawer = document.querySelector('[data-cart-drawer]');
    this.itemsContainer = document.querySelector('[data-cart-items]');
    this.footer = document.querySelector('[data-cart-footer]');
    this.subtotal = document.querySelector('[data-cart-subtotal]');
    this.countBubbles = document.querySelectorAll('[data-cart-count]');
    this.liveRegion = document.querySelector('[data-cart-live-region]');
    this.activeTrigger = null;

    this.bindEvents();
    this.refresh(false);
  }

  bindEvents() {
    document.addEventListener('submit', (event) => {
      const form = event.target.closest('[data-quick-add-form]');
      if (!form) return;
      event.preventDefault();
      this.addFromForm(form);
    });

    document.addEventListener('click', (event) => {
      const openButton = event.target.closest('[data-cart-open]');
      if (openButton) {
        this.activeTrigger = openButton;
        this.open();
      }

      if (event.target.closest('[data-cart-close]')) {
        this.close();
      }

      const removeButton = event.target.closest('[data-cart-remove]');
      if (removeButton) {
        this.changeLine(removeButton.dataset.cartRemove, 0);
      }
    });

    document.addEventListener('change', (event) => {
      const quantityInput = event.target.closest('[data-cart-quantity]');
      if (!quantityInput) return;
      this.changeLine(quantityInput.dataset.cartQuantity, Number(quantityInput.value));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.drawer?.classList.contains('is-open')) {
        this.close();
      }
    });
  }

  async addFromForm(form) {
    const button = form.querySelector('[data-quick-add-button]');
    const message = form.querySelector('[data-quick-add-message]');
    button.disabled = true;
    this.setMessage(message, 'Adding…');

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (!response.ok) throw await response.json();

      await this.refresh();
      this.setMessage(message, 'Added to cart.');
      this.open();
    } catch (error) {
      this.setMessage(message, error?.description || 'Could not add this item.');
    } finally {
      button.disabled = false;
    }
  }

  async changeLine(line, quantity) {
    await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ line: Number(line), quantity: Math.max(0, quantity) }),
    });
    await this.refresh();
  }

  async refresh(announce = true) {
    const response = await fetch('/cart.js', { headers: { Accept: 'application/json' } });
    const cart = await response.json();
    this.render(cart);
    if (announce) this.announce(`${cart.item_count} item${cart.item_count === 1 ? '' : 's'} in cart.`);
  }

  render(cart) {
    this.countBubbles.forEach((bubble) => {
      bubble.textContent = cart.item_count;
      bubble.hidden = cart.item_count === 0;
    });

    if (!this.itemsContainer) return;

    if (cart.item_count === 0) {
      this.itemsContainer.innerHTML = `
        <div class="cart-drawer__empty">
          <p>Your cart is empty</p>
          <a class="button" href="/collections/all">Continue shopping</a>
        </div>`;
      if (this.footer) this.footer.hidden = true;
      return;
    }

    this.itemsContainer.innerHTML = cart.items.map((item, index) => this.itemTemplate(item, index + 1)).join('');
    if (this.subtotal) this.subtotal.textContent = this.formatMoney(cart.total_price);
    if (this.footer) this.footer.hidden = false;
  }

  itemTemplate(item, line) {
    const image = item.image ? `<img src="${item.image}" alt="${this.escape(item.product_title)}" loading="lazy">` : '';
    return `
      <div class="cart-item" data-cart-line="${line}">
        <a class="cart-item__image" href="${item.url}">${image}</a>
        <div class="cart-item__details">
          <a class="cart-item__title" href="${item.url}">${this.escape(item.product_title)}</a>
          <span class="cart-item__price">${this.formatMoney(item.final_line_price)}</span>
          <label class="cart-item__quantity">
            <span>Qty</span>
            <input type="number" min="0" value="${item.quantity}" data-cart-quantity="${line}">
          </label>
          <button class="cart-item__remove button-unstyled" type="button" data-cart-remove="${line}">Remove</button>
        </div>
      </div>`;
  }

  open() {
    if (!this.drawer) return;
    this.drawer.classList.add('is-open');
    this.drawer.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('cart-drawer-open');
    this.drawer.querySelector('[role="dialog"]')?.focus();
  }

  close() {
    if (!this.drawer) return;
    this.drawer.classList.remove('is-open');
    this.drawer.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('cart-drawer-open');
    this.activeTrigger?.focus();
  }

  announce(message) {
    if (this.liveRegion) this.liveRegion.textContent = message;
  }

  setMessage(element, message) {
    if (element) element.textContent = message;
  }

  formatMoney(cents) {
    return new Intl.NumberFormat(document.documentElement.lang || 'en', {
      style: 'currency',
      currency: window.Shopify?.currency?.active || 'USD',
    }).format(cents / 100);
  }

  escape(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }[char]));
  }
}

document.addEventListener('DOMContentLoaded', () => new NeruvaCart());
