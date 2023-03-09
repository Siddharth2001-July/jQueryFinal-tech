var data = $.getJSON("data.json", function (res) { return res });
// data = data.responseJSON
$(document).ready(function () {
    data = data.responseJSON

    // ADD a row
    let idStartFrom = 100
    $('#entry').submit((e) => {
        e.preventDefault()
        let name = $('#name').val()
        let age = $('#age').val()
        let address = $('#address').val()
        data.push({
            'id': Math.floor(Math.random() * 9000),
            'name': name,
            'age': age,
            'address': address
        })
        save(data)
    })

    // Fetching Data
    for (let i = 0; i < data.length; i++) {
        $('#t-body').append(
            `<tr>
            <td>` + data[i].id + `</td>
            <td>` + data[i].name + `</td>
            <td>` + data[i].age + `</td>
            <td>` + data[i].address + `</td>
            <td><button class="btn btn-warning" value="`+ data[i].id + `">Edit</button></td>
            <td><button class="btn btn-danger" value="`+ data[i].id + `">Delete</button></td>
            </tr>`);
    }

    // EDIT
    $('#edit-div').hide();
    $('.btn-warning').click(function (e) {
        e.preventDefault()
        let id = $(this).val()
        let i = data.findIndex(i => i.id == id)
        let name = data[i].name
        let age = data[i].age
        let address = data[i].address
        $('#edit-div').show();
        $('#edit-id').val(id);
        $('#edit-name').val(name)
        $('#edit-age').val(age)
        $('#edit-address').val(address)
        window.location = "#edit-div"
    })
    $('#edit-form').submit(function (e){
        e.preventDefault()
        let id = $('#edit-id').val()
        let i = data.findIndex(i => i.id == id)
        data[i].name = $("#edit-name").val()
        data[i].age = $("#edit-age").val()
        data[i].address = $("#edit-address").val()
        save(data)
    })
    $("#close-edit").click((e)=>{
        e.preventDefault()
        $('#edit-div').hide();
    })

    // DELETE
    $('.btn-danger').click(function (e) {
        e.preventDefault()
        let id = $(this).val()
        let i = data.findIndex(i => i.id == id)
        data.splice(i,1)
        save(data);
    })
});

function save(storageObj) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "data.json");
    dlAnchorElem.click();
}