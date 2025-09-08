import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

interface FreeOrdersState {
  remainingFreeOrders: number;
  totalFreeOrders: number;
  hasShownExitPopup: boolean;
  hasShownFreeOfferPopup: boolean;
}

type FreeOrdersAction =
  | { type: 'DECREASE_FREE_ORDERS' }
  | { type: 'RESET_FREE_ORDERS' }
  | { type: 'SET_EXIT_POPUP_SHOWN' }
  | { type: 'SET_FREE_OFFER_POPUP_SHOWN' }
  | { type: 'LOAD_FROM_STORAGE'; payload: FreeOrdersState };

const initialState: FreeOrdersState = {
  remainingFreeOrders: 20,
  totalFreeOrders: 20,
  hasShownExitPopup: false,
  hasShownFreeOfferPopup: false,
};

const freeOrdersReducer = (state: FreeOrdersState, action: FreeOrdersAction): FreeOrdersState => {
  switch (action.type) {
    case 'DECREASE_FREE_ORDERS':
      const newRemaining = Math.max(0, state.remainingFreeOrders - 1);
      return {
        ...state,
        remainingFreeOrders: newRemaining,
      };
    
    case 'RESET_FREE_ORDERS':
      return {
        ...state,
        remainingFreeOrders: state.totalFreeOrders,
        hasShownExitPopup: false,
        hasShownFreeOfferPopup: false,
      };
    
    case 'SET_EXIT_POPUP_SHOWN':
      return {
        ...state,
        hasShownExitPopup: true,
      };
    
    case 'SET_FREE_OFFER_POPUP_SHOWN':
      return {
        ...state,
        hasShownFreeOfferPopup: true,
      };
    
    case 'LOAD_FROM_STORAGE':
      return action.payload;
    
    default:
      return state;
  }
};

interface FreeOrdersContextType {
  state: FreeOrdersState;
  decreaseFreeOrders: () => void;
  resetFreeOrders: () => void;
  clearAndReset: () => void;
  setExitPopupShown: () => void;
  setFreeOfferPopupShown: () => void;
  isOfferActive: () => boolean;
}

const FreeOrdersContext = createContext<FreeOrdersContextType | undefined>(undefined);

export const useFreeOrders = () => {
  const context = useContext(FreeOrdersContext);
  if (context === undefined) {
    throw new Error('useFreeOrders must be used within a FreeOrdersProvider');
  }
  return context;
};

interface FreeOrdersProviderProps {
  children: ReactNode;
}

export const FreeOrdersProvider: React.FC<FreeOrdersProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(freeOrdersReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('freeOrdersState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Only load if the saved state has the correct totalFreeOrders (20)
        if (parsedState.totalFreeOrders === 20) {
          dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedState });
        } else {
          // Clear old localStorage and reset to initial state
          localStorage.removeItem('freeOrdersState');
          dispatch({ type: 'RESET_FREE_ORDERS' });
        }
      } catch (error) {
        console.error('Error loading free orders state:', error);
        // Clear localStorage and reset to initial state on error
        localStorage.removeItem('freeOrdersState');
        dispatch({ type: 'RESET_FREE_ORDERS' });
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('freeOrdersState', JSON.stringify(state));
  }, [state]);

  const decreaseFreeOrders = () => {
    dispatch({ type: 'DECREASE_FREE_ORDERS' });
  };

  const resetFreeOrders = () => {
    dispatch({ type: 'RESET_FREE_ORDERS' });
  };

  const clearAndReset = () => {
    localStorage.removeItem('freeOrdersState');
    dispatch({ type: 'RESET_FREE_ORDERS' });
  };

  const setExitPopupShown = () => {
    dispatch({ type: 'SET_EXIT_POPUP_SHOWN' });
  };

  const setFreeOfferPopupShown = () => {
    dispatch({ type: 'SET_FREE_OFFER_POPUP_SHOWN' });
  };

  const isOfferActive = () => {
    return state.remainingFreeOrders > 0;
  };

  const value: FreeOrdersContextType = {
    state,
    decreaseFreeOrders,
    resetFreeOrders,
    clearAndReset,
    setExitPopupShown,
    setFreeOfferPopupShown,
    isOfferActive,
  };

  return <FreeOrdersContext.Provider value={value}>{children}</FreeOrdersContext.Provider>;
};
