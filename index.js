var ids = []

function submit_id() {
    const inp = document.getElementById("id_inp");
    ids.push(inp.value.toString());
    const nwEl = document.createElement("p");
    nwEl.id = inp.value;
    nwEl.classList.add("cou_id");
    nwEl.innerText = inp.value;
    nwEl.onclick = function () {
        delete_id(this);
    }
    document.getElementById("course_wrapper").append(nwEl);
    inp.value = "";
    update_code()
}

function delete_id(elem) {
    ids.splice(ids.indexOf(elem.id), 1);
    elem.remove();
    update_code()
}

function update_code() {
    const code_template = `const kurIDs = ${JSON.stringify(ids)};
const autoBook = false;

kurIDs.forEach(kurID => {
   Livewire.dispatch('addKurs', { kurID });
});
if (window.location.pathname === '/coursebooking' && autoBook) {
   window.location.replace("https://sawware.benno.webstitut.de/coursebooking/book")
};`
    document.getElementById("code_area").value = code_template;
}

window.onload = function () {
    update_code();
}