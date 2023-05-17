export const indicateSuccess = (dispatch, text: string) => {
    dispatch("showIndicator", {
        indicatorType: "btn-success",
        indicatorContent: text,
        indicatorVisible: true,
    });
};

export const indicateWarning = (dispatch, text: string) => {
    dispatch("showIndicator", {
        indicatorType: "btn-warning",
        indicatorContent: text,
        indicatorVisible: true,
    });
};

export const indicateInfo = (dispatch, text: string) => {
    dispatch("showIndicator", {
        indicatorType: "btn-info",
        indicatorContent: text,
        indicatorVisible: true,
    });
};

export const indicateError = (
    dispatch,
    text: string = "Unexpected error happened"
) => {
    dispatch("showIndicator", {
        indicatorType: "btn-error",
        indicatorContent: text,
        indicatorVisible: true,
    });
};
