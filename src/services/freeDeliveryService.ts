/**
 * Service to manage free delivery counter synchronization with admin actions
 */

interface FreeDeliveryCounterManager {
  increaseFreeOrders: () => void;
  decreaseFreeOrders: () => void;
  isOfferActive: () => boolean;
}

export class FreeDeliveryService {
  private static counterManager: FreeDeliveryCounterManager | null = null;

  /**
   * Register the counter manager (usually called from FreeOrdersContext)
   */
  static registerCounterManager(manager: FreeDeliveryCounterManager) {
    this.counterManager = manager;
  }

  /**
   * Handle order deletion - restore free delivery counter if order used free delivery
   */
  static handleOrderDeletion(orderUsedFreeDelivery: boolean) {
    if (orderUsedFreeDelivery && this.counterManager) {
      console.log('🔄 Restoring free delivery counter due to order deletion');
      this.counterManager.increaseFreeOrders();
    }
  }

  /**
   * Handle order cancellation - restore free delivery counter if order used free delivery
   */
  static handleOrderCancellation(orderUsedFreeDelivery: boolean) {
    if (orderUsedFreeDelivery && this.counterManager) {
      console.log('🔄 Restoring free delivery counter due to order cancellation');
      this.counterManager.increaseFreeOrders();
    }
  }

  /**
   * Handle order restoration (e.g., changing from canceled back to pending)
   * Decrease counter if order uses free delivery and offer is still active
   */
  static handleOrderRestoration(orderUsedFreeDelivery: boolean) {
    if (orderUsedFreeDelivery && this.counterManager && this.counterManager.isOfferActive()) {
      console.log('🔄 Decreasing free delivery counter due to order restoration');
      this.counterManager.decreaseFreeOrders();
    }
  }

  /**
   * Get current counter status for debugging
   */
  static getCounterStatus() {
    if (!this.counterManager) {
      return { isRegistered: false, isActive: false };
    }
    
    return {
      isRegistered: true,
      isActive: this.counterManager.isOfferActive()
    };
  }
}
