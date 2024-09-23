export const formatEventItem = (componentType) => {
    const eventCardDataSplit = componentType.split(" ");
    eventCardDataSplit.shift();
    eventCardDataSplit.shift();
    const eventCardDataJoin = eventCardDataSplit.join(" ");
    return eventCardDataJoin;
};
