export const checkItemIsUnique = (items, newItem) => {
    console.log(items)

    const newItemIsInItems = items.some((item) => {
        console.log(item)
        return item.id === newItem.id;
    });
    return !newItemIsInItems
};
