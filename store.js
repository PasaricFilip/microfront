window.myapp = {
    counter: 0,
    incrementor: () => {
        window.myapp.counter += 1;
        window.dispatchEvent(new Event('onIncrement'));
    },
    decrementor: () => {
        window.myapp.counter -= 1;
        window.dispatchEvent(new Event('onDecrement'));
    },
    edit: () => {
        window.myapp.counter -= 1;
        window.dispatchEvent(new Event('onEdit'));
    },
    delete: () => {
        window.myapp.counter -= 1;
        window.dispatchEvent(new Event('onDelete'));
    },
    submitData: () => {
        window.myapp.counter -= 1;
        window.dispatchEvent(new Event('onSubmit'));
    },
    changeData: () => {
        window.myapp.counter -= 1;
        window.dispatchEvent(new Event('onChange'));
    },
    refresh: () => {
        window.myapp.counter -= 1;
        window.dispatchEvent(new Event('onRefresh'));
    }
};