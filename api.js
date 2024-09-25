import axios from "axios";

const beApi = axios.create({
    baseURL: "https://be-pp-timeline.fly.dev/api",
});

export const deleteEventByID = (eventID) => {
    return beApi.delete(`/events/${eventID}`).then((response) => {
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

    return beApi.get("/events", { params: params }).then((response) => {
        return response.data.events;
    });
};

export const getEventByID = (eventID) => {
    return beApi.get(`/events/${eventID}`).then((response) => {
        return response.data.event;
    });
};

export const postEvent = (newEvent) => {
    return beApi.post("/events", newEvent).then((response) => {
        return response.data;
    });
};

export const getFeels = () => {
    return beApi.get("/feels").then((response) => {
        return response.data.feels;
    });
};

export const deleteTimelineByName = (timelineName) => {
    return beApi.delete(`/timelines/${timelineName}`).then((response) => {
        return response.data;
    });
};

export const getTimelines = () => {
    return beApi.get("/timelines").then((response) => {
        return response.data.timelines;
    });
};

export const getTimelineByName = (timelineName) => {
    return beApi.get(`/timelines/${timelineName}`).then((response) => {
        return response.data.timeline;
    });
};

export const patchTimelineByName = (timelineName, update) => {
    return beApi.patch(`/timelines/${timelineName}`, update).then((response) => {
        return response.data
    })
}

export const postTimeline = (newTimeline) => {
    return beApi.post("/timelines", newTimeline).then((response) => {
        return response.data;
    });
};
