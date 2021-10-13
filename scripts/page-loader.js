const PID = "page-loading-placeholder";

export function setPageLoading() {
    const $placeholder = document.createElement("div");
    $placeholder.id = PID;
    $placeholder.appendChild( document.createElement("div") );
    $placeholder.appendChild( document.createElement("div") );
    document.body.appendChild($placeholder);
}

export function pageDoneLoading() {
    // setTimeout(() => {
    //     document.body.classList.add("loaded");
    //     const $placeholder = document.querySelector(`#${PID}`);
    //     if ($placeholder) {
    //         $placeholder.remove();
    //     }
    // }, 250);
}
