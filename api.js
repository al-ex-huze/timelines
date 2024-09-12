import axios from "axios";

const beApi = axios.create({
    baseURL: "https://be-pp-timeline.fly.dev",
});

export const getEvents = (timelineFilter, sortByQuery, sortByIsAsc) => {
    let orderDirection = "";
    sortByIsAsc ? (orderDirection = "asc") : (orderDirection = "desc");
    let params = { timeline: timelineFilter, order: orderDirection };

    if (sortByQuery) params.sort_by = sortByQuery;
    if (timelineFilter) params.timeline = timelineFilter;
    
    return beApi.get("/api/events", { params: params }).then((response) => {
        // console.log("response " + JSON.stringify(response));
        return response.data.events;
    });
};
