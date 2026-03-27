const Toast = (() => {
    const container = document.getElementById('game-toast-container');
    
    function show(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'game-toast';
        toast.textContent = message;

        container.appendChild(toast);

        // 移除 toast
        setTimeout(() => {
            toast.remove();
        }, duration);
    }

    return { show };
})();