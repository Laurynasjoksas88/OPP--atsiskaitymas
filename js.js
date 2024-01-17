
const formFields = document.querySelector(".form-fields");

class Field {
    constructor(name) {
        this.name = name;
        this.input = false;
        this.label = false;
    }
    get value() {
        return this.input.value;
    }
    render() {
        this.label = document.createElement("label");
        this.label.innerText = this.name;
        formFields.appendChild(this.label);
        this.input = document.createElement("input");
        formFields.appendChild(this.input);
    }
    destroy() {
        this.label.remove();
        this.label = false;
        this.input.remove();
        this.input = false;
    }
}

class FieldController {
    constructor() {
        this.fieldList = [];
    }
    change(fieldList) {
        if (this.fieldList.length) {
            this.destroyList();
        }
        let list = [];
        for (const fieldName of fieldList) {
            list.push(new Field(fieldName));
        }
        this.fieldList = list;
        this.renderList();
    }
    renderList() {
        for (const field of this.fieldList) {
            field.render();
        }
    }
    destroyList() {
        for (const field of this.fieldList) {
            field.destroy();
        }
        this.fieldList = [];
    }
    getData() {
        const data = [];
        for (const field of this.fieldList) {
            data.push([field.name, field.value]);
        }
        return data;
    }
}

const fieldController = new FieldController();

selectCats();

function selectCats() {
    fieldController.change(["Name", "Age", "Legs", "Fur", "Tail", "Whiskers"]);
};
function selectDogs() {
    fieldController.change(["Name", "Age", "Legs", "Fur", "Tail", "Muzzle"]);
};
function selectBirds() {
    fieldController.change(["Name", "Age", "Legs", "Wings", "Beak"]);
};

const cardContainer = document.querySelector(".card-container");
function constructCard(data) {
    const cont = document.createElement("div");
    cont.classList.add("card");
    for (const item of data) {
        const fieldKey = item[0];
        const fieldValue = item[1];
        const key = document.createElement("div");
        key.innerText = fieldKey;
        cont.appendChild(key);
        const val = document.createElement("div");
        val.innerText = fieldValue;
        cont.appendChild(val);
    }
    cardContainer.appendChild(cont);
}
function submitForm() {
    const data = fieldController.getData();
    constructCard(data);
};
