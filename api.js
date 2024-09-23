import axios from "axios";

const beApi = axios.create({
    baseURL: "https://be-pp-timeline.fly.dev",
});

export const deleteEventByID = (eventID) => {
    return beApi.delete(`/api/events/${eventID}`).then((response) => {
        return response.data;
    });
};

export const getEvents = (timelineFilter, sortByQuery, sortByIsAsc) => {
    console.log(timelineFilter);
    let orderDirection = "";
    sortByIsAsc ? (orderDirection = "asc") : (orderDirection = "desc");
    let params = { timeline: timelineFilter, order: orderDirection };

    if (sortByQuery) params.sort_by = sortByQuery;
    if (timelineFilter) params.timeline = timelineFilter;

    return beApi.get("/api/events", { params: params }).then((response) => {
        return response.data.events;
    });
};

export const getEventByID = (eventID) => {
    return beApi.get(`/api/events/${eventID}`).then((response) => {
        return response.data.event;
    });
};

export const postEvent = (newEvent) => {
    return beApi.post("/api/events", newEvent).then((response) => {
        return response.data;
    });
};

export const getFeels = () => {
    return beApi.get("/api/feels").then((response) => {
        return response.data.feels;
    });
};

export const getTimelines = () => {
    return beApi.get("/api/timelines").then((response) => {
        return response.data.timelines;
    });
};

export const getTimelineByName = (timeline_name) => {
    return beApi.get(`/api/timelines/${timeline_name}`).then((response) => {
        return response.data.timeline;
    });
};
