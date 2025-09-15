import { create } from 'zustand';

const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: toast => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      visible: true,
      ...toast,
    };

    set(state => ({
      toasts: [...state.toasts, newToast],
    }));

    return id;
  },

  removeToast: id => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    }));
  },

  updateToast: (id, updates) => {
    set(state => ({
      toasts: state.toasts.map(toast =>
        toast.id === id ? { ...toast, ...updates } : toast,
      ),
    }));
  },

  clearAllToasts: () => {
    set({ toasts: [] });
  },
}));

export const useToast = () => {
  const { addToast, removeToast, updateToast, clearAllToasts, toasts } =
    useToastStore();

  const toast = {
    success: (message, options = {}) => {
      return addToast({
        message,
        type: 'success',
        ...options,
      });
    },

    error: (message, options = {}) => {
      return addToast({
        message,
        type: 'error',
        duration: 7000, // Keep error messages longer
        ...options,
      });
    },

    warning: (message, options = {}) => {
      return addToast({
        message,
        type: 'warning',
        ...options,
      });
    },

    info: (message, options = {}) => {
      return addToast({
        message,
        type: 'info',
        ...options,
      });
    },

    promise: async (promise, options = {}) => {
      const {
        loading = 'Loading...',
        success = 'Success!',
        error = 'Something went wrong',
      } = options;

      const loadingId = addToast({
        message: loading,
        type: 'info',
        duration: 0, // Don't auto-dismiss
      });

      try {
        const result = await promise;
        removeToast(loadingId);
        addToast({
          message: typeof success === 'function' ? success(result) : success,
          type: 'success',
        });
        return result;
      } catch (err) {
        removeToast(loadingId);
        addToast({
          message: typeof error === 'function' ? error(err) : error,
          type: 'error',
          duration: 7000,
        });
        throw err;
      }
    },
  };

  return {
    toast,
    toasts,
    removeToast,
    updateToast,
    clearAllToasts,
  };
};
