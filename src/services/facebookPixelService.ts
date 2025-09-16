// Facebook Pixel Service for tracking events
declare global {
  interface Window {
    fbq: any;
  }
}

export class FacebookPixelService {
  private static pixelId = '1716548252372656';
  
  // Check if Facebook Pixel is loaded
  static isLoaded(): boolean {
    return typeof window !== 'undefined' && window.fbq;
  }

  // Track page view (automatically tracked, but can be called manually)
  static trackPageView(): void {
    if (this.isLoaded()) {
      window.fbq('track', 'PageView');
      console.log('📊 Facebook Pixel: PageView tracked');
    }
  }

  // Track when user views content (product pages)
  static trackViewContent(contentName: string, contentCategory: string, value?: number): void {
    if (this.isLoaded()) {
      window.fbq('track', 'ViewContent', {
        content_name: contentName,
        content_category: contentCategory,
        value: value,
        currency: 'PKR'
      });
      console.log('📊 Facebook Pixel: ViewContent tracked', { contentName, contentCategory, value });
    }
  }

  // Track when user adds item to cart
  static trackAddToCart(contentName: string, value: number, quantity: number = 1): void {
    if (this.isLoaded()) {
      window.fbq('track', 'AddToCart', {
        content_name: contentName,
        value: value,
        currency: 'PKR',
        content_type: 'product',
        contents: [{
          id: 'pakasian-protein-nimko',
          quantity: quantity,
          item_price: value
        }]
      });
      console.log('📊 Facebook Pixel: AddToCart tracked', { contentName, value, quantity });
    }
  }

  // Track when user initiates checkout
  static trackInitiateCheckout(value: number, numItems: number): void {
    if (this.isLoaded()) {
      window.fbq('track', 'InitiateCheckout', {
        value: value,
        currency: 'PKR',
        num_items: numItems,
        content_type: 'product'
      });
      console.log('📊 Facebook Pixel: InitiateCheckout tracked', { value, numItems });
    }
  }

  // Track purchase (most important for conversion tracking)
  static trackPurchase(
    orderId: string,
    value: number,
    items: Array<{name: string, quantity: number, price: number}>
  ): void {
    if (this.isLoaded()) {
      window.fbq('track', 'Purchase', {
        value: value,
        currency: 'PKR',
        content_type: 'product',
        content_name: 'Pakasian Protein Nimko Order',
        order_id: orderId,
        contents: items.map((item, index) => ({
          id: `item-${index}`,
          quantity: item.quantity,
          item_price: item.price
        })),
        num_items: items.reduce((total, item) => total + item.quantity, 0)
      });
      console.log('📊 Facebook Pixel: Purchase tracked', { orderId, value, items });
    }
  }

  // Track lead generation (when someone shows interest)
  static trackLead(contentName?: string): void {
    if (this.isLoaded()) {
      window.fbq('track', 'Lead', {
        content_name: contentName || 'Pakasian Protein Nimko Interest',
        content_category: 'Food & Beverage'
      });
      console.log('📊 Facebook Pixel: Lead tracked', { contentName });
    }
  }

  // Track contact (when someone contacts the company)
  static trackContact(): void {
    if (this.isLoaded()) {
      window.fbq('track', 'Contact');
      console.log('📊 Facebook Pixel: Contact tracked');
    }
  }

  // Track search (when user searches for products)
  static trackSearch(searchString: string): void {
    if (this.isLoaded()) {
      window.fbq('track', 'Search', {
        search_string: searchString,
        content_category: 'Food & Beverage'
      });
      console.log('📊 Facebook Pixel: Search tracked', { searchString });
    }
  }

  // Track custom events
  static trackCustomEvent(eventName: string, parameters?: any): void {
    if (this.isLoaded()) {
      window.fbq('trackCustom', eventName, parameters);
      console.log('📊 Facebook Pixel: Custom event tracked', { eventName, parameters });
    }
  }

  // Track when user views product details
  static trackProductView(productName: string, price: number): void {
    this.trackViewContent(productName, 'Food & Beverage', price);
  }

  // Track when user completes order form
  static trackCompleteRegistration(): void {
    if (this.isLoaded()) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'Order Form Completion'
      });
      console.log('📊 Facebook Pixel: CompleteRegistration tracked');
    }
  }
}
