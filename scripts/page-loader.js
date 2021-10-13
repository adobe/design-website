const PID = "page-loading-placeholder";

export function setPageLoading() {
    const $placeholder = document.createElement("div");
    $placeholder.id = PID;
    $placeholder.appendChild( document.createElement("div") );
    const textPlaceholder = document.createElement("div");
    $placeholder.appendChild( textPlaceholder );
    textPlaceholder.appendChild(document.createElement("div"));
    textPlaceholder.appendChild(document.createElement("div"));
    textPlaceholder.appendChild(document.createElement("div"));
    document.body.appendChild($placeholder);
}

export function pageDoneLoading() {
    setTimeout(() => {
        document.body.classList.add("loaded");
        const $placeholder = document.querySelector(`#${PID}`);
        if ($placeholder) {
            $placeholder.remove();
        }
    }, 250);
}
