var ids = []
var autoBook = false;

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
    update_code();
}

function changeAutoSet(val) {
    autoBook = val;
    update_code();
}

function delete_id(elem) {
    ids.splice(ids.indexOf(elem.id), 1);
    elem.remove();
    update_code()
}

function update_code() {
    var theStr = "false"
    if(autoBook) { theStr = "true"}
    const code_template = `const kurIDs = ${JSON.stringify(ids)};
const autoBook = ${theStr};

kurIDs.forEach(kurID => {
   Livewire.dispatch('addKurs', JSON.parse('{\u0022kursID\u0022:kurID}'));
});
if (window.location.pathname === '/coursebooking' && autoBook) {
   window.location.replace("https://sawware.benno.webstitut.de/coursebooking/book")
};`
    document.getElementById("code_area").value = code_template;
    localStorage.setItem("cour_ids", JSON.stringify(ids))
}

window.onload = function () {
    const pret = JSON.parse(localStorage.getItem("cour_ids"))
    if(pret != null) { ids = pret}
    for (let index = 0; index < ids.length; index++) {
        const element = ids[index];
        const nwEl = document.createElement("p");
        nwEl.id = element;
        nwEl.classList.add("cou_id");
        nwEl.innerText = element;
        nwEl.onclick = function () {
            delete_id(this);
        }
        document.getElementById("course_wrapper").append(nwEl);
    }
    update_code();
}